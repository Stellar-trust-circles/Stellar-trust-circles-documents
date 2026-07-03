/**
 * Example: Creating a Trust Circle
 *
 * This example shows how to create a new savings circle using the SDK.
 * Run with: npx ts-node examples/create-circle.ts
 */

import { TrustCircleClient } from '../sdks/javascript/src';

async function main() {
  const client = new TrustCircleClient({
    network: 'testnet',
    contractId: 'CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS',
  });

  const alice = 'GDXYZ_ALICE_ADDRESS_HERE';
  const bob = 'GDEF_BOB_ADDRESS_HERE';
  const carol = 'GHIJ_CAROL_ADDRESS_HERE';

  try {
    const circleId = await client.createCircle({
      members: [alice, bob, carol],
      contributionAmount: 50_000_000, // 5 USDC in stroops
      cycleLength: 604800, // 1 week in seconds
    });

    console.log(`Circle created with ID: ${circleId}`);

    const circle = await client.getCircle({ circleId });
    console.log('Circle details:');
    console.log(`  Admin: ${circle.admin}`);
    console.log(`  Members: ${circle.members.length}`);
    console.log(`  Contribution: ${circle.contributionAmount / 10_000_000} USDC`);
    console.log(`  Cycle length: ${circle.cycleLength / 86400} days`);
  } catch (error) {
    console.error('Failed to create circle:', error);
  }
}

main();
