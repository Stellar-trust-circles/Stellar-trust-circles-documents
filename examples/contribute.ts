/**
 * Example: Contributing to a Trust Circle
 *
 * This example shows how to contribute USDC to an existing circle.
 * Run with: npx ts-node examples/contribute.ts
 */

import { TrustCircleClient, TrustCircleError, ErrorCode } from '../sdks/javascript/src';

async function main() {
  const client = new TrustCircleClient({
    network: 'testnet',
    contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
  });

  try {
    const circle = await client.getCircle({ circleId: 0 });

    console.log(`Contributing to circle ${circle.id}`);
    console.log(`  Current cycle: ${circle.currentCycle + 1}/${circle.totalCycles}`);
    console.log(`  Contribution amount: ${circle.contributionAmount / 10_000_000} USDC`);

    const onTime = await client.contribute({ circleId: 0 });

    if (onTime) {
      console.log('Contribution successful and on time!');
    } else {
      console.log('Contribution made but was late. Reputation penalty applied.');
    }

    const rep = await client.getReputation({ address: 'YOUR_ADDRESS_HERE' });
    console.log(`Your reputation: ${rep.score} (${rep.tier})`);
  } catch (error) {
    if (error instanceof TrustCircleError) {
      switch (error.code) {
        case ErrorCode.AlreadyContributed:
          console.log('You already contributed this cycle.');
          break;
        case ErrorCode.CycleClosed:
          console.log('The cycle deadline has passed.');
          break;
        case ErrorCode.NotMember:
          console.log('You are not a member of this circle.');
          break;
        default:
          console.error('Error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

main();
