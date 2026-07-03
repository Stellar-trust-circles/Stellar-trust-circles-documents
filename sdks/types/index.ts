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

export interface TransactionResult {
  hash: string;
  ledger: number;
  success: boolean;
  fee: number;
}

export interface SimulateResult {
  cost: number;
  events: ContractEvent[];
}

export interface ContractEvent {
  type: string;
  value: unknown;
}

export interface MemberInfo {
  address: string;
  reputation: Reputation;
  hasContributed: boolean;
}

export interface CircleSummary {
  id: number;
  memberCount: number;
  contributionAmount: bigint;
  cycleLength: number;
  currentCycle: number;
  totalCycles: number;
  isActive: boolean;
  totalPot: bigint;
}
