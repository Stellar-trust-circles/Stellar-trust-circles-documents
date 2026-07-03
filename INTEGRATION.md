# Integration Guide

This guide covers everything you need to integrate with the Trust Circle Soroban smart contract from your own application. It is written for developers who are building against the contract API.

For a non-technical overview, see [USER_GUIDE.md](USER_GUIDE.md). For the full contract architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Prerequisites

- Stellar CLI v26.0.0 or higher
- Rust v1.84.0 or higher (for building the contract)
- Node.js 18+ (for the JavaScript SDK) or Python 3.10+ (for the Python SDK)
- A funded Stellar testnet account
- Freighter browser wallet (for frontend integration)

---

## Contract IDs

| Network | Contract ID |
|---------|------------|
| Testnet | `CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS` |
| Mainnet | Coming soon |

---

## Quick Start

### Using the JavaScript SDK

```bash
npm install @stellar-trust-circles/sdk
```

```typescript
import { TrustCircleClient } from '@stellar-trust-circles/sdk';

const client = new TrustCircleClient({
  network: 'testnet',
  contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
});

// Read circle state
const circle = await client.getCircle('circle-id');
console.log(circle);
```

### Using the Python SDK

```bash
pip install stellar-trust-circles
```

```python
from trust_circle import TrustCircleClient

client = TrustCircleClient(
    network="testnet",
    contract_id="CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS"
)

circle = client.get_circle("circle-id")
print(circle)
```

### Using Stellar CLI

```bash
stellar contract invoke \
  --id CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS \
  --source your-keypair \
  --network testnet \
  -- \
  get_circle
```

---

## Contract Functions Reference

### create_circle

Creates a new savings circle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `members` | `Vec<Address>` | Yes | Ordered list of member Stellar addresses (including the creator) |
| `contribution_amount` | `i128` | Yes | Fixed contribution per cycle in stroops (1 USDC = 10,000,000 stroops) |
| `cycle_length` | `u64` | Yes | Duration of each cycle in seconds (e.g., 604800 for 1 week) |

**Returns:** `u32` — The circle ID.

**Authorization:** The caller must be one of the members (they are automatically added as admin).

**Example:**

```typescript
const circleId = await client.createCircle({
  members: [aliceAddress, bobAddress, carolAddress],
  contributionAmount: 50_000_000, // 5 USDC
  cycleLength: 604800, // 1 week
});
```

```python
circle_id = client.create_circle(
    members=[alice_address, bob_address, carol_address],
    contribution_amount=50_000_000,  # 5 USDC
    cycle_length=604800,  # 1 week
)
```

**Errors:**

| Error | Cause |
|-------|-------|
| `EmptyMembers` | No members provided |
| `DuplicateMembers` | Two or more members share the same address |
| `InvalidAmount` | Contribution amount is zero or negative |
| `InvalidCycleLength` | Cycle length is too short (minimum 1 hour) or too long (maximum 1 year) |

---

### contribute

Deposit USDC for the current cycle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle to contribute to |

**Returns:** `bool` — `true` if the contribution was on time, `false` if late.

**Authorization:** The caller must be a member of the circle. The contract will call `transfer` on the USDC token contract to move funds from the caller to the contract.

**Example:**

```typescript
const onTime = await client.contribute({ circleId: 0 });
```

```python
on_time = client.contribute(circle_id=0)
```

**Errors:**

| Error | Cause |
|-------|-------|
| `NotMember` | Caller is not a member of this circle |
| `CircleInactive` | The circle is not currently active |
| `AlreadyContributed` | The caller already contributed this cycle |
| `CycleClosed` | The cycle deadline has passed |
| `TransferFailed` | The USDC transfer failed (insufficient balance, etc.) |

---

### release_payout

Release the pooled contributions to the next member in rotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle to release payout for |

**Returns:** `bool` — `true` if the circle is still active after this payout, `false` if it is now complete.

**Authorization:** The caller must be the admin or the next recipient.

**Example:**

```typescript
const stillActive = await client.releasePayout({ circleId: 0 });
```

```python
still_active = client.release_payout(circle_id=0)
```

**Errors:**

| Error | Cause |
|-------|-------|
| `NotAuthorized` | Caller is not the admin or the next recipient |
| `CycleNotEnded` | The cycle deadline has not passed yet |
| `CircleInactive` | The circle has already completed all cycles |
| `TransferFailed` | The USDC transfer to the recipient failed |

---

### get_circle

Read the current state of a circle. This is a free, read-only call (no transaction required).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle to read |

**Returns:** `Circle` struct with all circle state.

**Example:**

```typescript
const circle = await client.getCircle({ circleId: 0 });
console.log(`Members: ${circle.members.length}`);
console.log(`Current cycle: ${circle.currentCycle}`);
```

```python
circle = client.get_circle(circle_id=0)
print(f"Members: {len(circle.members)}")
print(f"Current cycle: {circle.current_cycle}")
```

---

### get_reputation

Read a member's on-chain reputation score. This is a free, read-only call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `Address` | Yes | The member's Stellar address |

**Returns:** `Reputation` struct with score, contributions, and misses.

**Example:**

```typescript
const rep = await client.getReputation({ address: aliceAddress });
console.log(`Score: ${rep.score}, Tier: ${rep.tier}`);
```

```python
rep = client.get_reputation(address=alice_address)
print(f"Score: {rep.score}, Tier: {rep.tier}")
```

---

### has_contributed

Check if a member has contributed in a given cycle. Free, read-only call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle |
| `address` | `Address` | Yes | The member's address |
| `cycle` | `u32` | Yes | The cycle number to check |

**Returns:** `bool`

---

### restart_circle

Restart a completed circle for another rotation. Resets the cycle counter but preserves reputation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle to restart |

**Authorization:** The caller must be the admin.

**Errors:**

| Error | Cause |
|-------|-------|
| `NotAdmin` | Caller is not the circle admin |
| `CircleActive` | The circle is still running (not all cycles completed) |

---

### vouch

Vouch for a new member's trustworthiness. Requires the voucher to have reputation ≥ 50.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `Address` | Yes | The address to vouch for |

**Authorization:** The caller must have reputation ≥ 50.

**Effects:**
- Voucher loses 5 reputation points
- Vouched address gains 5 reputation points
- Maximum 3 vouches per address

**Errors:**

| Error | Cause |
|-------|-------|
| `InsufficientReputation` | Caller has fewer than 50 reputation points |
| `MaxVouchesReached` | The target address already has 3 vouches |
| `AlreadyVouched` | The caller already vouched for this address |
| `CannotVouchSelf` | The caller is vouching for themselves |

---

### get_vouches

Return how many vouches an address has received. Free, read-only call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `Address` | Yes | The address to check |

**Returns:** `u32` — Number of vouches received.

---

### propose

Submit a governance proposal to change a circle rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle |
| `proposal_type` | `ProposalType` | Yes | The type of change |
| `new_value` | `i128` | Yes | The proposed new value |
| `target_address` | `Address` | No | Required for AddMember/RemoveMember/ChangeAdmin |

**Authorization:** The caller must be a member of the circle.

**Proposal Types:**

| Type | `new_value` Meaning |
|------|---------------------|
| `ChangeContribution` | New contribution amount in stroops |
| `ChangeCycleLength` | New cycle length in seconds |
| `AddMember` | Ignored (use `target_address`) |
| `RemoveMember` | Index of the member to remove |
| `ChangeAdmin` | Ignored (use `target_address`) |

**Errors:**

| Error | Cause |
|-------|-------|
| `NotMember` | Caller is not a circle member |
| `CircleInactive` | The circle is not currently active |
| `InvalidProposalType` | The proposal type is not supported |
| `DuplicateProposal` | An identical proposal is already open |

---

### vote

Vote on an open governance proposal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle |
| `proposal_id` | `u32` | Yes | The proposal to vote on |
| `vote` | `bool` | Yes | `true` for yes, `false` for no |

**Authorization:** The caller must be a member of the circle and must not have already voted on this proposal.

**Errors:**

| Error | Cause |
|-------|-------|
| `NotMember` | Caller is not a circle member |
| `AlreadyVoted` | Caller already voted on this proposal |
| `VotingClosed` | The voting deadline has passed |
| `ProposalNotFound` | The proposal ID does not exist |

---

### execute_proposal

Execute a governance proposal that has reached majority.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle |
| `proposal_id` | `u32` | Yes | The proposal to execute |

**Authorization:** The caller must be the admin.

**Effects:** Changes the circle state according to the proposal type and new value.

**Errors:**

| Error | Cause |
|-------|-------|
| `NotAdmin` | Caller is not the circle admin |
| `VotingStillOpen` | The voting deadline has not passed |
| `NotPassed` | The proposal did not reach majority |
| `AlreadyExecuted` | The proposal was already executed |

---

### get_proposal

Read a governance proposal by ID. Free, read-only call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `circle_id` | `u32` | Yes | The circle |
| `proposal_id` | `u32` | Yes | The proposal ID |

**Returns:** `Proposal` struct.

---

## Token Integration

Trust Circles uses the USDC token contract on Stellar. To interact with the contract, you need to handle token transfers.

### Approving Token Spending

Before a member can contribute, they must approve the Trust Circle contract to spend their USDC:

```typescript
import { contract, nativeToScVal } from '@stellar/stellar-sdk';

// Approve the Trust Circle contract to spend 50 USDC
await contract.call(
  usdcContractAddress,
  'approve',
  nativeToScVal(aliceAddress, { type: 'address' }),
  nativeToScVal(trustCircleContractAddress, { type: 'address' }),
  nativeToScVal(50_000_000, { type: 'i128' }),
  // ... other params
);
```

```python
# Approve the Trust Circle contract to spend 50 USDC
client.approve_token_spend(
    token_address=usdc_address,
    spender=trust_circle_address,
    amount=50_000_000,
)
```

### Checking USDC Balance

```typescript
const balance = await client.getTokenBalance({
  address: aliceAddress,
  tokenAddress: usdcContractAddress,
});
console.log(`Balance: ${balance / 10_000_000} USDC`);
```

```python
balance = client.get_token_balance(
    address=alice_address,
    token_address=usdc_address,
)
print(f"Balance: {balance / 10_000_000} USDC")
```

---

## Error Handling

All contract functions return results using Soroban's `Result<T, Error>` pattern. The SDK wraps these into typed exceptions.

### JavaScript SDK

```typescript
import { TrustCircleError, ErrorCode } from '@stellar-trust-circles/sdk';

try {
  await client.contribute({ circleId: 0 });
} catch (error) {
  if (error instanceof TrustCircleError) {
    switch (error.code) {
      case ErrorCode.AlreadyContributed:
        console.log('You already contributed this cycle');
        break;
      case ErrorCode.CycleClosed:
        console.log('The cycle deadline has passed');
        break;
      default:
        console.error('Contract error:', error.message);
    }
  }
}
```

### Python SDK

```python
from trust_circle.exceptions import TrustCircleError, ErrorCode

try:
    client.contribute(circle_id=0)
except TrustCircleError as error:
    if error.code == ErrorCode.ALREADY_CONTRIBUTED:
        print("You already contributed this cycle")
    elif error.code == ErrorCode.CYCLE_CLOSED:
        print("The cycle deadline has passed")
    else:
        print(f"Contract error: {error}")
```

---

## Event Indexing

The contract emits events for every state change. You can listen for events to build real-time UIs.

### Event Types

| Event | Emitted When |
|-------|-------------|
| `circle_created` | A new circle is created |
| `contribution_made` | A member contributes |
| `payout_released` | The pot is released to a recipient |
| `circle_restarted` | A completed circle is restarted |
| `vouch_made` | A member vouches for another |
| `proposal_submitted` | A governance proposal is submitted |
| `vote_cast` | A member votes on a proposal |
| `proposal_executed` | A proposal is executed |

### Listening for Events

```typescript
const events = await client.getEvents({
  contractId: trustCircleContractAddress,
  eventType: 'contract',
  limit: 10,
});

events.forEach(event => {
  console.log(`Event: ${event.type}`, event.value);
});
```

---

## Gas Estimation

Before submitting a transaction, simulate it to estimate the fee:

```typescript
const simulation = await client.simulateContribute({ circleId: 0 });
console.log(`Estimated fee: ${simulation.fee} stroops`);
```

```python
simulation = client.simulate_contribute(circle_id=0)
print(f"Estimated fee: {simulation.fee} stroops")
```

---

## Testing on Testnet

Always test on testnet before deploying to mainnet. The testnet contract ID is:

```
CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS
```

Get testnet USDC from the [Stellar testnet faucet](https://testnet.stellar.org).

### Quick Test Script

```bash
# Generate keys
stellar keys generate alice --network testnet
stellar keys generate bob --network testnet
stellar keys generate carol --network testnet

# Fund accounts
curl "https://friendbot.stellar.org?addr=$(stellar keys address alice)"
curl "https://friendbot.stellar.org?addr=$(stellar keys address bob)"
curl "https://friendbot.stellar.org?addr=$(stellar keys address carol)"

# Create a circle
stellar contract invoke \
  --id CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS \
  --source alice \
  --network testnet \
  -- \
  create_circle \
  --members "[\"$(stellar keys address alice)\", \"$(stellar keys address bob)\", \"$(stellar keys address carol)\"]" \
  --contribution_amount 50000000 \
  --cycle_length 604800
```
