/**
 * Example: Releasing a Payout
 *
 * This example shows how to release the pooled contributions to the next member.
 * Run with: npx ts-node examples/release-payout.ts
 */

import { TrustCircleClient } from '../sdks/javascript/src';

async function main() {
  const client = new TrustCircleClient({
    network: 'testnet',
    contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
  });

  try {
    const circle = await client.getCircle({ circleId: 0 });

    if (!circle.isActive) {
      console.log('Circle is not active.');
      return;
    }

    const nextRecipient = circle.members[circle.nextRecipient];
    console.log(`Releasing payout to: ${nextRecipient}`);
    console.log(`Expected pot: ${circle.contributionAmount * BigInt(circle.members.length) / 10_000_000n} USDC`);

    const stillActive = await client.releasePayout({ circleId: 0 });

    if (stillActive) {
      console.log('Payout released! Circle continues to next cycle.');
    } else {
      console.log('Payout released! Circle has completed all cycles.');
    }

    const updatedCircle = await client.getCircle({ circleId: 0 });
    console.log(`Current cycle: ${updatedCircle.currentCycle}/${updatedCircle.totalCycles}`);
  } catch (error) {
    console.error('Failed to release payout:', error);
  }
}

main();
