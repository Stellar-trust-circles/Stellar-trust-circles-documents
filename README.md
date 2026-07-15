cat > /mnt/user-data/outputs/documents-README.md << 'ENDOFFILE'
<div align="center">

# Trust Circles — Documents

**Documentation, SDKs, CLI tool, and code examples for the Stellar Trust Circles protocol**

*Everything you need to integrate with, build on top of, or understand Trust Circles*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![JS SDK](https://img.shields.io/badge/JS%20SDK-v0.1.0-7C3AED)](sdks/javascript)
[![Python SDK](https://img.shields.io/badge/Python%20SDK-v0.1.0-0F6E56)](sdks/python)
[![CLI](https://img.shields.io/badge/CLI-v0.1.0-B9762E)](sdks/cli)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933)](sdks/javascript)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB)](sdks/python)

</div>

---

## What this repo contains

This repository is the third pillar of the Trust Circles organisation. While the `contracts` repo holds the on-chain protocol and the `frontend` repo holds the web interface, this repo holds everything that makes the protocol accessible to developers and understandable to users:

- **Documentation** — architecture, integration guide, user guide, security model, FAQ, glossary, troubleshooting
- **JavaScript/TypeScript SDK** — an installable npm package for integrating Trust Circles into any JS or TS application
- **Python SDK** — a pip-installable package for Python backends and scripts
- **CLI tool** — a command-line interface for interacting with deployed circles directly
- **Code examples** — runnable TypeScript and Python snippets for every common contract interaction

---

## Repository Structure

```
Stellar-trust-circles-documents/
├── docs/
│   ├── FAQ.md                        # Combined product, technical, and contributor FAQ
│   └── TROUBLESHOOTING.md            # Common errors and how to resolve them
├── examples/
│   ├── create-circle.ts              # Full circle creation example in TypeScript
│   ├── contribute.ts                 # Contribution example in TypeScript
│   ├── release-payout.ts             # Payout release example in TypeScript
│   └── python/
│       ├── create_circle.py          # Circle creation example in Python
│       └── contribute.py             # Contribution example in Python
├── sdks/
│   ├── types/                        # Shared type definitions (consumed by JS SDK)
│   │   ├── index.ts
│   │   └── package.json              # @stellar-trust-circles/types
│   ├── javascript/                   # JavaScript/TypeScript SDK
│   │   ├── src/
│   │   │   ├── client.ts             # TrustCircleClient class
│   │   │   ├── types.ts              # Full type definitions
│   │   │   ├── errors.ts             # TrustCircleError + ErrorCode enum
│   │   │   └── index.ts              # Package exports
│   │   ├── package.json              # @stellar-trust-circles/sdk
│   │   ├── tsconfig.json
│   │   └── README.md
│   ├── python/                       # Python SDK
│   │   ├── trust_circle/
│   │   │   ├── __init__.py           # Public API exports
│   │   │   ├── client.py             # TrustCircleClient class
│   │   │   ├── models.py             # Dataclass models for all contract types
│   │   │   └── exceptions.py         # TrustCircleError + ErrorCode enum
│   │   ├── setup.py                  # pip install stellar-trust-circles
│   │   ├── requirements.txt
│   │   ├── pytest.ini
│   │   └── README.md
│   └── cli/                          # CLI tool
│       ├── index.ts                  # Command implementations
│       └── package.json              # @stellar-trust-circles/cli → trust-circle binary
├── ARCHITECTURE.md                   # System architecture and component diagram
├── CONTRIBUTING.md                   # How to contribute to this repo
├── CODE_OF_CONDUCT.md
├── INTEGRATION.md                    # Developer integration guide (all 13 functions)
├── LICENSE
├── README.md                         # This file
├── SECURITY.md                       # Security policy and vulnerability disclosure
├── TRUST_SECURITY.md                 # Plain-language trust model for end users
├── USER_GUIDE.md                     # Plain-language guide for circle members
└── glossary.md                       # Definitions for every term used across docs
```

---

## Documentation

### For users (no blockchain experience required)

| Document | Description |
|----------|-------------|
| [USER_GUIDE.md](USER_GUIDE.md) | What rotating savings groups are, how to join and contribute, how payouts work, what happens if you miss, and how reputation works — written for someone who has never used a blockchain app |
| [TRUST_SECURITY.md](TRUST_SECURITY.md) | What the smart contract guarantees and what it doesn't, wallet security, audit status, and what to do if something seems wrong |
| [docs/FAQ.md](docs/FAQ.md) | Answers to the most common questions from users, developers, and contributors |
| [glossary.md](glossary.md) | Plain-language definitions of every term used across all Trust Circles documentation |

### For developers

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Full system architecture — how the three repos connect, the contract↔frontend data flow, USDC addresses by network, and security considerations |
| [INTEGRATION.md](INTEGRATION.md) | Complete developer guide for calling the contract from any application — every function's parameters, expected behavior, events emitted, and error messages |
| [SECURITY.md](SECURITY.md) | Private vulnerability disclosure process, scope, and audit status |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common errors during development and deployment, with exact solutions |

---

## JavaScript / TypeScript SDK

**Package:** `@stellar-trust-circles/sdk`
**Location:** `sdks/javascript/`
**Node.js:** 18+
**Dependency:** `@stellar/stellar-sdk` v12

The JavaScript SDK provides a typed `TrustCircleClient` class that wraps all 13 contract functions. It supports Testnet, Mainnet, and local Standalone network out of the box.

### Installation

```bash
npm install @stellar-trust-circles/sdk
# or
yarn add @stellar-trust-circles/sdk
```

### Quick start

```typescript
import { TrustCircleClient } from '@stellar-trust-circles/sdk';

const client = new TrustCircleClient({
  network: 'testnet',
  contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
});

// Read circle state — free, no transaction
const circle = await client.getCircle({ contractId: '...' });
console.log(circle.name, circle.currentCycle, circle.isActive);

// Create a circle
await client.createCircle({
  members: ['GABC...', 'GXYZ...'],
  contributionAmount: 100_000_000,  // 10 USDC in stroops
  cycleLength: 604800,              // 1 week in seconds
});
```

### Available methods

| Method | Type | Contract function |
|--------|------|------------------|
| `createCircle(params)` | Write | `create_circle` |
| `contribute(params)` | Write | `contribute` |
| `releasePayout(params)` | Write | `release_payout` |
| `restartCircle(params)` | Write | `restart_circle` |
| `vouch(params)` | Write | `vouch` |
| `propose(params)` | Write | `propose` |
| `vote(params)` | Write | `vote` |
| `executeProposal(params)` | Write | `execute_proposal` |
| `getCircle(params)` | Read | `get_circle` |
| `getReputation(params)` | Read | `get_reputation` |
| `hasContributed(params)` | Read | `has_contributed` |
| `getVouches(params)` | Read | `get_vouches` |
| `getProposal(params)` | Read | `get_proposal` |

### Error handling

```typescript
import { TrustCircleError, ErrorCode } from '@stellar-trust-circles/sdk';

try {
  await client.contribute({ member: address });
} catch (err) {
  if (err instanceof TrustCircleError) {
    switch (err.code) {
      case ErrorCode.ALREADY_CONTRIBUTED:
        // handle
      case ErrorCode.DEADLINE_PASSED:
        // handle
    }
  }
}
```

### Network configurations

```typescript
// Testnet (default for development)
new TrustCircleClient({ network: 'testnet', contractId: '...' });

// Mainnet (requires completed audit)
new TrustCircleClient({ network: 'mainnet', contractId: '...' });

// Local standalone (for development against a local node)
new TrustCircleClient({
  network: 'standalone',
  contractId: '...',
  rpcUrl: 'http://localhost:8000/soroban/rpc',
});
```

See [sdks/javascript/README.md](sdks/javascript/README.md) for full SDK documentation.

---

## Python SDK

**Package:** `stellar-trust-circles`
**Location:** `sdks/python/`
**Python:** 3.10+
**Dependency:** `stellar-sdk` 7.0+

The Python SDK provides a `TrustCircleClient` class with the same contract coverage as the JavaScript SDK, implemented as straightforward synchronous methods with dataclass return types.

### Installation

```bash
pip install stellar-trust-circles
```

### Quick start

```python
from trust_circle import TrustCircleClient

client = TrustCircleClient(
    network="testnet",
    contract_id="CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS",
)

# Read circle state
circle = client.get_circle()
print(circle.name, circle.current_cycle, circle.is_active)

# Create a circle
circle_id = client.create_circle(
    members=["GABC...", "GXYZ..."],
    contribution_amount=100_000_000,  # 10 USDC in stroops
    cycle_length=604800,              # 1 week
)

# Get reputation for an address
reputation = client.get_reputation(member="GABC...")
print(reputation.score, reputation.tier)  # e.g. 50, ReputationTier.BUILDING_TRUST
```

### Models

The Python SDK returns typed dataclass instances:

```python
@dataclass
class Circle:
    name: str
    admin: str
    usdc_token: str
    contribution_amount: int
    members: list[str]
    current_cycle: int
    payout_index: int
    cycle_deadline: int
    cycle_length_secs: int
    is_active: bool

@dataclass
class Reputation:
    score: int
    tier: ReputationTier   # NEW_MEMBER | BUILDING_TRUST | TRUSTED

@dataclass
class Proposal:
    id: int
    proposer: str
    proposal_type: ProposalType
    votes_yes: int
    votes_no: int
    voters: list[str]
    executed: bool
```

### Error handling

```python
from trust_circle.exceptions import TrustCircleError, ErrorCode

try:
    client.contribute(member=address)
except TrustCircleError as e:
    if e.code == ErrorCode.ALREADY_CONTRIBUTED:
        print("Already contributed this cycle")
    elif e.code == ErrorCode.DEADLINE_PASSED:
        print("Contribution deadline has passed")
```

See [sdks/python/README.md](sdks/python/README.md) for full SDK documentation.

---

## CLI Tool

**Package:** `@stellar-trust-circles/cli`
**Binary:** `trust-circle`
**Location:** `sdks/cli/`

A command-line interface for interacting with deployed Trust Circle contracts directly from the terminal. Useful for testing, debugging, and scripting.

### Installation

```bash
npm install -g @stellar-trust-circles/cli
```

### Commands

```bash
# Circle management
trust-circle create  --name "Lagos Squad" --members addr1,addr2 --amount 10 --cycle weekly
trust-circle status  --circle <CONTRACT_ID>
trust-circle contribute --circle <CONTRACT_ID>
trust-circle payout  --circle <CONTRACT_ID>

# Reputation
trust-circle rep     --circle <CONTRACT_ID> --address <STELLAR_ADDRESS>
trust-circle vouch   --circle <CONTRACT_ID> --for <STELLAR_ADDRESS>

# Governance
trust-circle propose --circle <CONTRACT_ID> --type change_amount --value 20
trust-circle vote    --circle <CONTRACT_ID> --proposal 0 --yes
trust-circle execute --circle <CONTRACT_ID> --proposal 0
```

### Environment

```bash
export STELLAR_SECRET_KEY=SXXX...
export CONTRACT_ID=CXXX...
export STELLAR_NETWORK=testnet
```

---

## Code Examples

`examples/` contains runnable code for the most common integration patterns.

| File | Language | What it demonstrates |
|------|----------|---------------------|
| `create-circle.ts` | TypeScript | Create a circle with multiple members, print the result |
| `contribute.ts` | TypeScript | Connect a keypair and submit a contribution |
| `release-payout.ts` | TypeScript | Release payout as admin and read updated state |
| `python/create_circle.py` | Python | Same circle creation flow using the Python SDK |
| `python/contribute.py` | Python | Same contribution flow using the Python SDK |

All examples use Testnet and read the contract ID and secret key from environment variables. No real funds are involved.

### Running the TypeScript examples

```bash
cd examples
npm install
STELLAR_SECRET_KEY=SXXX... CONTRACT_ID=CXXX... npx ts-node create-circle.ts
```

### Running the Python examples

```bash
cd examples/python
pip install stellar-trust-circles
STELLAR_SECRET_KEY=SXXX... CONTRACT_ID=CXXX... python create_circle.py
```

---

## The Maintenance Rule

This is the most important rule in this repository: **documentation must stay synchronized with the contract.**

Any pull request to `STC-smart-contracts` that adds, changes, or removes a public function must update `INTEGRATION.md` in the same release cycle. Any pull request that changes a function's error messages must update `docs/TROUBLESHOOTING.md`. Any new term introduced anywhere must be added to `glossary.md`.

If you notice documentation that has drifted out of sync with the actual contract, opening an issue here is a valid and welcome contribution even if you didn't write the original code change.

---

## USDC Addresses

| Network | USDC Asset Issuer |
|---------|------------------|
| Testnet | `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` |
| Mainnet | `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN` |

---

## Organisation Repositories

| Repo | Description |
|------|-------------|
| [STC-smart-contracts](https://github.com/Stellar-trust-circles/STC-smart-contracts) | Soroban contracts — Rust |
| [frontend](https://github.com/Stellar-trust-circles/frontend) | React + TypeScript web interface |
| **documents** (this repo) | Documentation, SDKs, CLI, and examples |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines specific to this repository — tone rules for user-facing documents, the maintenance rule, the style guide for integration docs, and the review checklist for documentation PRs.

Issues tagged [`good first issue`](../../issues?q=label%3A%22good+first+issue%22) include things like adding a new code example, translating a section of `USER_GUIDE.md`, or writing a test for one of the SDK methods.

---

## License

MIT — see [LICENSE](LICENSE)
