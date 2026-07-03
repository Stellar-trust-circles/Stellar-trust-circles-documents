export interface CircleConfig {
  network: 'testnet' | 'mainnet' | 'standalone';
  contractId: string;
  rpcUrl?: string;
  passphrase?: string;
}

export interface Circle {
  id: number;
  admin: string;
  members: string[];
  contributionAmount: bigint;
  cycleLength: number;
  currentCycle: number;
  nextRecipient: number;
  totalCycles: number;
  isActive: boolean;
  startTime: number;
  usdcToken: string;
}

export interface Contribution {
  address: string;
  cycle: number;
  amount: bigint;
  timestamp: number;
  isLate: boolean;
}

export interface Reputation {
  address: string;
  score: bigint;
  contributions: number;
  missed: number;
  tier: ReputationTier;
}

export type ReputationTier = 'new_member' | 'building_trust' | 'trusted';

export interface Proposal {
  id: number;
  proposer: string;
  proposalType: ProposalType;
  newValue: bigint;
  targetAddress?: string;
  votesFor: number;
  votesAgainst: number;
  isExecuted: boolean;
  deadline: number;
}

export type ProposalType =
  | 'change_contribution'
  | 'change_cycle_length'
  | 'add_member'
  | 'remove_member'
  | 'change_admin';

export interface CreateCircleParams {
  members: string[];
  contributionAmount: number | bigint;
  cycleLength: number;
}

export interface ContributeParams {
  circleId: number;
}

export interface ReleasePayoutParams {
  circleId: number;
}

export interface GetCircleParams {
  circleId: number;
}

export interface GetReputationParams {
  address: string;
}

export interface HasContributedParams {
  circleId: number;
  address: string;
  cycle: number;
}

export interface RestartCircleParams {
  circleId: number;
}

export interface VouchParams {
  address: string;
}

export interface GetVouchesParams {
  address: string;
}

export interface ProposeParams {
  circleId: number;
  proposalType: ProposalType;
  newValue: number | bigint;
  targetAddress?: string;
}

export interface VoteParams {
  circleId: number;
  proposalId: number;
  vote: boolean;
}

export interface ExecuteProposalParams {
  circleId: number;
  proposalId: number;
}

export interface GetProposalParams {
  circleId: number;
  proposalId: number;
}
