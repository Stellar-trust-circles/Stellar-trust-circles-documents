# Trust Circles Python SDK

Python SDK for interacting with the Stellar Trust Circles smart contract.

## Installation

```bash
pip install stellar-trust-circles
```

## Quick Start

```python
from trust_circle import TrustCircleClient

client = TrustCircleClient(
    network="testnet",
    contract_id="CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS",
)

# Read circle state
circle = client.get_circle(circle_id=0)
print(f"Circle has {len(circle.members)} members")

# Contribute to a circle
on_time = client.contribute(circle_id=0)
print(f"Contribution on time: {on_time}")

# Check reputation
rep = client.get_reputation(address="GDXYZ...")
print(f"Reputation score: {rep.score}, tier: {rep.tier}")
```

## API Reference

### Client

```python
TrustCircleClient(
    network: str,          # "testnet", "mainnet", or "standalone"
    contract_id: str,      # Deployed contract ID
    rpc_url: str = None,   # Optional custom RPC URL
    passphrase: str = None # Optional custom network passphrase
)
```

### Methods

#### `create_circle(members, contribution_amount, cycle_length) -> int`

Create a new savings circle.

```python
circle_id = client.create_circle(
    members=["GABC...", "GDEF...", "GHIJ..."],
    contribution_amount=50_000_000,  # 5 USDC in stroops
    cycle_length=604800,  # 1 week in seconds
)
```

#### `contribute(circle_id) -> bool`

Deposit USDC for the current cycle.

```python
on_time = client.contribute(circle_id=0)
```

#### `release_payout(circle_id) -> bool`

Release the pot to the next member in rotation.

```python
still_active = client.release_payout(circle_id=0)
```

#### `get_circle(circle_id) -> Circle`

Read circle state (free, read-only).

```python
circle = client.get_circle(circle_id=0)
```

#### `get_reputation(address) -> Reputation`

Read a member's reputation score.

```python
rep = client.get_reputation(address="GDXYZ...")
```

#### `has_contributed(circle_id, address, cycle) -> bool`

Check if a member contributed in a given cycle.

```python
contributed = client.has_contributed(circle_id=0, address="GDXYZ...", cycle=0)
```

#### `restart_circle(circle_id)`

Restart a completed circle.

```python
client.restart_circle(circle_id=0)
```

#### `vouch(address)`

Vouch for a new member.

```python
client.vouch(address="GNEW...")
```

#### `get_vouches(address) -> int`

Get the number of vouches for an address.

```python
count = client.get_vouches(address="GNEW...")
```

#### `propose(circle_id, proposal_type, new_value, target_address=None) -> int`

Submit a governance proposal.

```python
from trust_circle import ProposalType

proposal_id = client.propose(
    circle_id=0,
    proposal_type=ProposalType.CHANGE_CONTRIBUTION,
    new_value=100_000_000,  # 10 USDC
)
```

#### `vote(circle_id, proposal_id, vote)`

Vote on a governance proposal.

```python
client.vote(circle_id=0, proposal_id=1, vote=True)
```

#### `execute_proposal(circle_id, proposal_id)`

Execute a passed governance proposal.

```python
client.execute_proposal(circle_id=0, proposal_id=1)
```

#### `get_proposal(circle_id, proposal_id) -> Proposal`

Read a proposal by ID.

```python
proposal = client.get_proposal(circle_id=0, proposal_id=1)
```

## Error Handling

```python
from trust_circle import TrustCircleError, ErrorCode

try:
    client.contribute(circle_id=0)
except TrustCircleError as error:
    if error.code == ErrorCode.ALREADY_CONTRIBUTED:
        print("Already contributed this cycle")
    elif error.code == ErrorCode.CYCLE_CLOSED:
        print("Cycle deadline has passed")
    else:
        print(f"Contract error: {error}")
```

## License

MIT
