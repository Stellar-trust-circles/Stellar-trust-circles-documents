"""Data models for Trust Circles SDK."""

from dataclasses import dataclass
from enum import Enum
from typing import Optional


class ReputationTier(Enum):
    """Reputation tier based on score."""

    NEW_MEMBER = "new_member"
    BUILDING_TRUST = "building_trust"
    TRUSTED = "trusted"


class ProposalType(Enum):
    """Types of governance proposals."""

    CHANGE_CONTRIBUTION = "change_contribution"
    CHANGE_CYCLE_LENGTH = "change_cycle_length"
    ADD_MEMBER = "add_member"
    REMOVE_MEMBER = "remove_member"
    CHANGE_ADMIN = "change_admin"


@dataclass
class Circle:
    """A savings circle."""

    id: int
    admin: str
    members: list[str]
    contribution_amount: int
    cycle_length: int
    current_cycle: int
    next_recipient: int
    total_cycles: int
    is_active: bool
    start_time: int
    usdc_token: str


@dataclass
class Contribution:
    """A member's contribution to a cycle."""

    address: str
    cycle: int
    amount: int
    timestamp: int
    is_late: bool


@dataclass
class Reputation:
    """A member's on-chain reputation."""

    address: str
    score: int
    contributions: int
    missed: int
    tier: ReputationTier


@dataclass
class Proposal:
    """A governance proposal."""

    id: int
    proposer: str
    proposal_type: ProposalType
    new_value: int
    target_address: Optional[str]
    votes_for: int
    votes_against: int
    is_executed: bool
    deadline: int
