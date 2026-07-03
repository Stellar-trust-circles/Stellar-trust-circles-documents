# Architecture

This document describes the system architecture of Stellar Trust Circles — the on-chain smart contracts, their data model, and how they interact with the Stellar network and the frontend application.

---

## Overview

Stellar Trust Circles is a fully on-chain protocol. There is no backend server. The frontend talks directly to the Stellar network via Horizon and Soroban RPC, and the Soroban smart contract enforces all circle logic — contributions, payouts, reputation, vouching, and governance.

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Stellar Network                            │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    Soroban Runtime                             │  │
│  │                                                                │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │              Trust Circle Contract                       │  │  │
│  │  │                                                          │  │  │
│  │  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │  │  │
│  │  │  │   Circle     │  │  Reputation  │  │  Governance   │  │  │  │
│  │  │  │   State      │  │  System      │  │  System       │  │  │  │
│  │  │  └─────────────┘  └──────────────┘  └───────────────┘  │  │  │
│  │  │  ┌─────────────┐  ┌──────────────┐                      │  │  │
│  │  │  │   Vouching  │  │  Payout      │                      │  │  │
│  │  │  │   System    │  │  Rotation    │                      │  │  │
│  │  │  └─────────────┘  └──────────────┘                      │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  │                                                                │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │              Soroban Token Contract (USDC)               │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─────────────────┐    ┌─────────────────┐                         │
│  │   Horizon API    │    │  Soroban RPC    │                         │
│  │   (read-only)    │    │  (contract I/O) │                         │
│  └────────┬────────┘    └────────┬────────┘                         │
└───────────┼──────────────────────┼──────────────────────────────────┘
            │                      │
            ▼                      ▼
┌───────────────────────────────────────────────────────┐
│                  Frontend (React)                     │
│                                                       │
│  ┌──────────┐  ┌───────────┐  ┌───────────────────┐  │
│  │ Freighter │  │  Circle   │  │  Governance UI    │  │
│  │ Wallet    │  │  Manager  │  │                   │  │
│  └──────────┘  └───────────┘  └───────────────────┘  │
└───────────────────────────────────────────────────────┘
```

---

## Contract Data Model

### Circle

A circle is the core entity. Each circle has:

| Field | Type | Description |
|-------|------|-------------|
| `admin` | `Address` | The address that created the circle |
| `members` | `Vec<Address>` | Ordered list of member addresses |
| `contribution_amount` | `i128` | Fixed USDC contribution per cycle (in stroops) |
| `cycle_length` | `u64` | Duration of each cycle in seconds |
| `current_cycle` | `u32` | The active cycle number (0-indexed) |
| `next_recipient` | `u32` | Index of the member who receives the next payout |
| `total_cycles` | `u32` | Total number of cycles (= number of members) |
| `is_active` | `bool` | Whether the circle is currently running |
| `start_time` | `u64` | Unix timestamp when the circle started |
| `usdc_token` | `Address` | Address of the USDC contract on Stellar |

### Member Contribution

Each member's contribution per cycle:

| Field | Type | Description |
|-------|------|-------------|
| `address` | `Address` | Member's Stellar address |
| `cycle` | `u32` | Cycle number |
| `amount` | `i128` | Amount contributed (in stroops) |
| `timestamp` | `u64` | When the contribution was made |
| `is_late` | `bool` | Whether the contribution was after the deadline |

### Reputation Record

| Field | Type | Description |
|-------|------|-------------|
| `address` | `Address` | Member's Stellar address |
| `score` | `i128` | Current reputation score (never below 0) |
| `contributions` | `u32` | Total contributions made |
| `missed` | `u32` | Total contributions missed |

### Governance Proposal

| Field | Type | Description |
|-------|------|-------------|
| `id` | `u32` | Unique proposal ID within the circle |
| `proposer` | `Address` | Who submitted the proposal |
| `proposal_type` | `ProposalType` | What change is being proposed |
| `new_value` | `i128` | The proposed new value |
| `votes_for` | `u32` | Number of yes votes |
| `votes_against` | `u32` | Number of no votes |
| `is_executed` | `bool` | Whether the proposal has been executed |
| `deadline` | `u64` | When voting closes |

---

## Contract Lifecycle

### 1. Circle Creation

```
create_circle(members, contribution_amount, cycle_length)
```

- Validates that all members are unique and non-empty
- Sets the caller as admin
- Initializes reputation scores to 0 for all members
- Sets `current_cycle` to 0, `next_recipient` to 0
- Records `start_time` as the current ledger timestamp
- Stores the USDC token address for escrow

### 2. Contribution

```
contribute(circle_id)
```

- Verifies the caller is a member of the circle
- Verifies the cycle is still open (within `cycle_length` of `start_time + current_cycle * cycle_length`)
- Transfers USDC from the member to the contract (Soroban token `transfer` from user to contract)
- Records the contribution with timestamp
- If late: marks `is_late` and reduces reputation by 20
- If on time: increases reputation by 10

### 3. Payout Release

```
release_payout(circle_id)
```

- Verifies the cycle deadline has passed
- Verifies the caller is the admin or the next recipient
- Sums all contributions received in the current cycle
- Transfers the full pot from the contract to the `next_recipient`
- Advances `current_cycle` by 1
- Advances `next_recipient` by 1 (wrapping around)
- If all members have received, marks the circle as inactive

### 4. Circle Restart

```
restart_circle(circle_id)
```

- Verifies the caller is the admin
- Verifies the circle is inactive (all cycles completed)
- Resets `current_cycle` to 0, `next_recipient` to 0
- Sets `is_active` to true
- Does NOT reset reputation scores (they persist)

---

## Reputation System

Reputation is computed per-member across all circles they participate in. The on-chain state stores a running total.

| Event | Score Change |
|-------|-------------|
| On-time contribution | +10 |
| Missed contribution | -20 (saturates at 0) |
| Received vouch | +5 (to vouch target) |
| Vouched for someone | +2 (to voucher) |

### Reputation Tiers

| Score Range | Tier | Capabilities |
|-------------|------|--------------|
| 0–49 | New Member | Can join circles, cannot vouch |
| 50–99 | Building Trust | Can vouch for others |
| 100+ | Trusted | Can vouch, can be circle admin |

---

## Vouching System

A vouch is an on-chain endorsement. Any member with reputation ≥ 50 can vouch for a new address before that address joins a circle.

- Maximum 3 vouches per address (across all circles)
- Each vouch costs the vouching member 5 reputation points
- The vouched address gains 5 reputation points
- A vouch cannot be revoked once submitted

---

## Governance System

Any circle member can submit a governance proposal to change circle parameters:

### Supported Proposal Types

| Type | Description | New Value Meaning |
|------|-------------|-------------------|
| `ChangeContribution` | Change the contribution amount | New amount in stroops |
| `ChangeCycleLength` | Change the cycle duration | New length in seconds |
| `AddMember` | Add a new member | 0 (address stored separately) |
| `RemoveMember` | Remove a member | Index of member to remove |
| `ChangeAdmin` | Transfer admin rights | 0 (address stored separately) |

### Voting Rules

- Each member gets exactly one vote per proposal
- Voting period: 48 hours from proposal submission
- Pass threshold: strictly more than 50% of members must vote yes
- If the proposal passes, the admin executes it
- Only the admin can execute passed proposals
- A proposal that fails cannot be resubmitted for the same change within one cycle

---

## Token Flow

```
Member ──transfer──▶ Contract (escrow) ──transfer──▶ Recipient
                      │
                      └── (cycle complete) ──▶ full pot
```

All token movements use the Soroban token contract's `transfer` function with `require_auth` on the sender. The Trust Circle contract is the escrow holder — no individual controls the pooled funds.

### Safety Invariants

1. The contract can never hold more USDC than the sum of all active circles' expected pots
2. A member cannot contribute more than once per cycle
3. Payout can only be released after the cycle deadline
4. The admin cannot withdraw funds unilaterally
5. Reputation scores are monotonically non-negative (saturating arithmetic)

---

## Storage Layout

Soroban contracts use key-value storage. The Trust Circle contract uses these storage namespaces:

| Key Pattern | Value | Lifetime |
|-------------|-------|----------|
| `circle:{id}` | `Circle` struct | Permanent |
| `circle:{id}:members` | `Vec<Address>` | Permanent |
| `circle:{id}:cycle:{n}:contributions` | `Map<Address, Contribution>` | Permanent |
| `circle:{id}:proposals:{pid}` | `Proposal` struct | Permanent |
| `reputation:{address}` | `Reputation` struct | Permanent |
| `vouches:{address}` | `Vec<Address>` | Permanent |
| `config:{key}` | `Value` | Permanent |

All storage is persistent (survives across contract invocations). There is no temporary storage used.

---

## Frontend Architecture

The frontend is a React single-page application with three main layers:

| Layer | Responsibility |
|-------|----------------|
| **Wallet** | Freighter integration — connect, sign, send transactions |
| **Data** | Reads circle state, reputation, and proposals from the chain |
| **UI** | Renders circle dashboards, contribution flows, governance |

The frontend communicates with the Stellar network through:
- **Horizon API** — for reading ledger data, account balances, transaction history
- **Soroban RPC** — for simulating and submitting smart contract invocations

There is no middleware, no API server, and no database. The blockchain is the single source of truth.

---

## Security Model

- All state mutations require cryptographic authorization via `require_auth`
- The contract cannot call external contracts or transfer tokens without explicit user authorization
- The admin role is limited to payout release and circle restart only
- Governance proposals require majority consensus to execute
- Reputation uses saturating arithmetic to prevent negative scores

For the full security policy and vulnerability disclosure process, see [SECURITY.md](SECURITY.md).
