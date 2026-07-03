"""
Example: Contributing to a Trust Circle (Python)

This example shows how to contribute USDC to an existing circle.
Run with: python examples/python/contribute.py
"""

import sys
sys.path.insert(0, "sdks/python")

from trust_circle import TrustCircleClient, TrustCircleError, ErrorCode


def main():
    client = TrustCircleClient(
        network="testnet",
        contract_id="CANM5X47IG3AM5JDG6DVGZ24B3RLBNT5653CXRUEUDWF6JERO4YEX6ZS",
    )

    try:
        circle = client.get_circle(circle_id=0)

        print(f"Contributing to circle {circle.id}")
        print(f"  Current cycle: {circle.current_cycle + 1}/{circle.total_cycles}")
        print(f"  Contribution amount: {circle.contribution_amount / 10_000_000} USDC")

        on_time = client.contribute(circle_id=0)

        if on_time:
            print("Contribution successful and on time!")
        else:
            print("Contribution made but was late. Reputation penalty applied.")

        rep = client.get_reputation(address="YOUR_ADDRESS_HERE")
        print(f"Your reputation: {rep.score} ({rep.tier.value})")

    except TrustCircleError as error:
        if error.code == ErrorCode.ALREADY_CONTRIBUTED:
            print("You already contributed this cycle.")
        elif error.code == ErrorCode.CYCLE_CLOSED:
            print("The cycle deadline has passed.")
        elif error.code == ErrorCode.NOT_MEMBER:
            print("You are not a member of this circle.")
        else:
            print(f"Error: {error}", file=sys.stderr)
            sys.exit(1)
    except Exception as error:
        print(f"Unexpected error: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
