"""
Example: Creating a Trust Circle (Python)

This example shows how to create a new savings circle using the Python SDK.
Run with: python examples/python/create_circle.py
"""

import sys
sys.path.insert(0, "sdks/python")

from trust_circle import TrustCircleClient


def main():
    client = TrustCircleClient(
        network="testnet",
        contract_id="CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS",
    )

    alice = "GDXYZ_ALICE_ADDRESS_HERE"
    bob = "GDEF_BOB_ADDRESS_HERE"
    carol = "GHIJ_CAROL_ADDRESS_HERE"

    try:
        circle_id = client.create_circle(
            members=[alice, bob, carol],
            contribution_amount=50_000_000,  # 5 USDC in stroops
            cycle_length=604800,  # 1 week in seconds
        )

        print(f"Circle created with ID: {circle_id}")

        circle = client.get_circle(circle_id=circle_id)
        print("Circle details:")
        print(f"  Admin: {circle.admin}")
        print(f"  Members: {len(circle.members)}")
        print(f"  Contribution: {circle.contribution_amount / 10_000_000} USDC")
        print(f"  Cycle length: {circle.cycle_length / 86400} days")

    except Exception as error:
        print(f"Failed to create circle: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
