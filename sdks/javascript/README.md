# Trust Circles JavaScript SDK

JavaScript/TypeScript SDK for interacting with the Stellar Trust Circles smart contract.

## Installation

```bash
npm install @stellar-trust-circles/sdk
```

## Quick Start

```typescript
import { TrustCircleClient } from '@stellar-trust-circles/sdk';

const client = new TrustCircleClient({
  network: 'testnet',
  contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
});

// Read circle state
const circle = await client.getCircle({ circleId: 0 });
console.log(`Circle has ${circle.members.length} members`);

// Contribute to a circle
const onTime = await client.contribute({ circleId: 0 });
console.log(`Contribution on time: ${onTime}`);

// Check reputation
const rep = await client.getReputation({ address: 'GDXYZ...' });
console.log(`Reputation score: ${rep.score}, tier: ${rep.tier}`);
```

## API Reference

### Client

```typescript
new TrustCircleClient(config: CircleConfig)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `network` | `'testnet' \| 'mainnet' \| 'standalone'` | Stellar network to connect to |
| `contractId` | `string` | The deployed Trust Circle contract ID |
| `rpcUrl` | `string?` | Optional custom RPC URL |
| `passphrase` | `string?` | Optional custom network passphrase |

### Methods

#### `createCircle(params)`

Creates a new savings circle.

```typescript
const circleId = await client.createCircle({
  members: ['GABC...', 'GDEF...', 'GHIJ...'],
  contributionAmount: 50_000_000, // 5 USDC in stroops
  cycleLength: 604800, // 1 week in seconds
});
```

#### `contribute(params)`

Deposit USDC for the current cycle.

```typescript
const onTime = await client.contribute({ circleId: 0 });
```

#### `releasePayout(params)`

Release the pot to the next member in rotation.

```typescript
const stillActive = await client.releasePayout({ circleId: 0 });
```

#### `getCircle(params)`

Read circle state (free, read-only).

```typescript
const circle = await client.getCircle({ circleId: 0 });
```

#### `getReputation(params)`

Read a member's reputation score (free, read-only).

```typescript
const rep = await client.getReputation({ address: 'GDXYZ...' });
```

#### `hasContributed(params)`

Check if a member contributed in a given cycle (free, read-only).

```typescript
const contributed = await client.hasContributed({
  circleId: 0,
  address: 'GDXYZ...',
  cycle: 0,
});
```

#### `restartCircle(params)`

Restart a completed circle.

```typescript
await client.restartCircle({ circleId: 0 });
```

#### `vouch(params)`

Vouch for a new member.

```typescript
await client.vouch({ address: 'GNEW...' });
```

#### `getVouches(params)`

Get the number of vouches for an address.

```typescript
const count = await client.getVouches({ address: 'GNEW...' });
```

#### `propose(params)`

Submit a governance proposal.

```typescript
const proposalId = await client.propose({
  circleId: 0,
  proposalType: 'change_contribution',
  newValue: 100_000_000, // 10 USDC
});
```

#### `vote(params)`

Vote on a governance proposal.

```typescript
await client.vote({
  circleId: 0,
  proposalId: 1,
  vote: true,
});
```

#### `executeProposal(params)`

Execute a passed governance proposal.

```typescript
await client.executeProposal({
  circleId: 0,
  proposalId: 1,
});
```

#### `getProposal(params)`

Read a proposal by ID.

```typescript
const proposal = await client.getProposal({
  circleId: 0,
  proposalId: 1,
});
```

## Error Handling

```typescript
import { TrustCircleError, ErrorCode } from '@stellar-trust-circles/sdk';

try {
  await client.contribute({ circleId: 0 });
} catch (error) {
  if (error instanceof TrustCircleError) {
    switch (error.code) {
      case ErrorCode.AlreadyContributed:
        console.log('Already contributed this cycle');
        break;
      case ErrorCode.CycleClosed:
        console.log('Cycle deadline has passed');
        break;
      default:
        console.error('Contract error:', error.message);
    }
  }
}
```

## License

MIT
