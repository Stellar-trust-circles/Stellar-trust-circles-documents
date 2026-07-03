"""Trust Circle client for interacting with the Soroban smart contract."""

from typing import Optional

from .models import Circle, Contribution, Reputation, ReputationTier, Proposal, ProposalType
from .exceptions import TrustCircleError, ErrorCode

NETWORK_CONFIGS = {
    "testnet": {
        "rpc_url": "https://soroban-testnet.stellar.org:443",
        "passphrase": "Test SDF Network ; September 2015",
    },
    "mainnet": {
        "rpc_url": "https://soroban-mainnet.stellar.org:443",
        "passphrase": "Public Global Stellar Network ; September 2015",
    },
    "standalone": {
        "rpc_url": "http://localhost:8000/soroban/rpc",
        "passphrase": "Standalone Network ; September 2023",
    },
}


def _compute_tier(score: int) -> ReputationTier:
    """Compute reputation tier from score."""
    if score >= 100:
        return ReputationTier.TRUSTED
    if score >= 50:
        return ReputationTier.BUILDING_TRUST
    return ReputationTier.NEW_MEMBER


class TrustCircleClient:
    """Client for interacting with the Trust Circle smart contract."""

    def __init__(
        self,
        network: str,
        contract_id: str,
        rpc_url: Optional[str] = None,
        passphrase: Optional[str] = None,
    ):
        if network not in NETWORK_CONFIGS:
            raise ValueError(f"Invalid network: {network}. Must be one of: {list(NETWORK_CONFIGS.keys())}")

        config = NETWORK_CONFIGS[network]
        self.network = network
        self.contract_id = contract_id
        self.rpc_url = rpc_url or config["rpc_url"]
        self.passphrase = passphrase or config["passphrase"]

    def create_circle(
        self,
        members: list[str],
        contribution_amount: int,
        cycle_length: int,
    ) -> int:
        """Create a new savings circle.

        Args:
            members: List of member Stellar addresses (including the creator).
            contribution_amount: Fixed contribution per cycle in stroops.
            cycle_length: Duration of each cycle in seconds.

        Returns:
            The circle ID.
        """
        self._validate_create_params(members, contribution_amount, cycle_length)
        return self._invoke_contract("create_circle", [members, contribution_amount, cycle_length])

    def contribute(self, circle_id: int) -> bool:
        """Deposit USDC for the current cycle.

        Args:
            circle_id: The circle to contribute to.

        Returns:
            True if contribution was on time, False if late.
        """
        return self._invoke_contract("contribute", [circle_id])

    def release_payout(self, circle_id: int) -> bool:
        """Release the pot to the next member in rotation.

        Args:
            circle_id: The circle to release payout for.

        Returns:
            True if the circle is still active, False if complete.
        """
        return self._invoke_contract("release_payout", [circle_id])

    def get_circle(self, circle_id: int) -> Circle:
        """Read circle state.

        Args:
            circle_id: The circle to read.

        Returns:
            Circle state.
        """
        return self._invoke_contract("get_circle", [circle_id])

    def get_reputation(self, address: str) -> Reputation:
        """Read a member's reputation score.

        Args:
            address: The member's Stellar address.

        Returns:
            Reputation record with tier.
        """
        rep = self._invoke_contract("get_reputation", [address])
        return Reputation(
            address=rep["address"],
            score=rep["score"],
            contributions=rep["contributions"],
            missed=rep["missed"],
            tier=_compute_tier(rep["score"]),
        )

    def has_contributed(self, circle_id: int, address: str, cycle: int) -> bool:
        """Check if a member contributed in a given cycle.

        Args:
            circle_id: The circle.
            address: The member's address.
            cycle: The cycle number.

        Returns:
            True if the member contributed.
        """
        return self._invoke_contract("has_contributed", [circle_id, address, cycle])

    def restart_circle(self, circle_id: int) -> None:
        """Restart a completed circle.

        Args:
            circle_id: The circle to restart.
        """
        self._invoke_contract("restart_circle", [circle_id])

    def vouch(self, address: str) -> None:
        """Vouch for a new member.

        Args:
            address: The address to vouch for.
        """
        self._invoke_contract("vouch", [address])

    def get_vouches(self, address: str) -> int:
        """Get the number of vouches for an address.

        Args:
            address: The address to check.

        Returns:
            Number of vouches.
        """
        return self._invoke_contract("get_vouches", [address])

    def propose(
        self,
        circle_id: int,
        proposal_type: ProposalType,
        new_value: int,
        target_address: Optional[str] = None,
    ) -> int:
        """Submit a governance proposal.

        Args:
            circle_id: The circle.
            proposal_type: The type of change.
            new_value: The proposed new value.
            target_address: Required for add/remove/change_admin proposals.

        Returns:
            The proposal ID.
        """
        return self._invoke_contract(
            "propose", [circle_id, proposal_type.value, new_value, target_address]
        )

    def vote(self, circle_id: int, proposal_id: int, vote: bool) -> None:
        """Vote on a governance proposal.

        Args:
            circle_id: The circle.
            proposal_id: The proposal to vote on.
            vote: True for yes, False for no.
        """
        self._invoke_contract("vote", [circle_id, proposal_id, vote])

    def execute_proposal(self, circle_id: int, proposal_id: int) -> None:
        """Execute a passed governance proposal.

        Args:
            circle_id: The circle.
            proposal_id: The proposal to execute.
        """
        self._invoke_contract("execute_proposal", [circle_id, proposal_id])

    def get_proposal(self, circle_id: int, proposal_id: int) -> Proposal:
        """Read a governance proposal.

        Args:
            circle_id: The circle.
            proposal_id: The proposal ID.

        Returns:
            Proposal state.
        """
        return self._invoke_contract("get_proposal", [circle_id, proposal_id])

    def _validate_create_params(
        self, members: list[str], contribution_amount: int, cycle_length: int
    ) -> None:
        """Validate parameters for create_circle."""
        if not members:
            raise TrustCircleError(ErrorCode.EMPTY_MEMBERS, "At least one member is required")

        if len(set(members)) != len(members):
            raise TrustCircleError(ErrorCode.DUPLICATE_MEMBERS, "All members must be unique")

        if contribution_amount <= 0:
            raise TrustCircleError(ErrorCode.INVALID_AMOUNT, "Contribution amount must be positive")

        if cycle_length < 3600 or cycle_length > 31536000:
            raise TrustCircleError(
                ErrorCode.INVALID_CYCLE_LENGTH,
                "Cycle length must be between 1 hour and 1 year",
            )

    def _invoke_contract(self, method: str, args: list) -> any:
        """Invoke a contract method.

        This is a placeholder that will be connected to the Stellar SDK.
        """
        raise TrustCircleError(
            ErrorCode.TRANSFER_FAILED,
            f"Contract invocation for {method} not yet implemented",
        )
