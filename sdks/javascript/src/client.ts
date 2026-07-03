import {
  Circle,
  Reputation,
  ReputationTier,
  Proposal,
  CreateCircleParams,
  ContributeParams,
  ReleasePayoutParams,
  GetCircleParams,
  GetReputationParams,
  HasContributedParams,
  RestartCircleParams,
  VouchParams,
  GetVouchesParams,
  ProposeParams,
  VoteParams,
  ExecuteProposalParams,
  GetProposalParams,
  CircleConfig,
} from './types';
import { TrustCircleError, ErrorCode } from './errors';

const NETWORK_CONFIGS = {
  testnet: {
    rpcUrl: 'https://soroban-testnet.stellar.org:443',
    passphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    rpcUrl: 'https://soroban-mainnet.stellar.org:443',
    passphrase: 'Public Global Stellar Network ; September 2015',
  },
  standalone: {
    rpcUrl: 'http://localhost:8000/soroban/rpc',
    passphrase: 'Standalone Network ; September 2023',
  },
};

export class TrustCircleClient {
  private config: Required<CircleConfig>;

  constructor(config: CircleConfig) {
    const networkConfig = NETWORK_CONFIGS[config.network];
    this.config = {
      network: config.network,
      contractId: config.contractId,
      rpcUrl: config.rpcUrl || networkConfig.rpcUrl,
      passphrase: config.passphrase || networkConfig.passphrase,
    };
  }

  async createCircle(params: CreateCircleParams): Promise<number> {
    this.validateCreateParams(params);
    return this.invokeContract<number>('create_circle', [
      params.members,
      BigInt(params.contributionAmount),
      params.cycleLength,
    ]);
  }

  async contribute(params: ContributeParams): Promise<boolean> {
    return this.invokeContract<boolean>('contribute', [params.circleId]);
  }

  async releasePayout(params: ReleasePayoutParams): Promise<boolean> {
    return this.invokeContract<boolean>('release_payout', [params.circleId]);
  }

  async getCircle(params: GetCircleParams): Promise<Circle> {
    return this.invokeContract<Circle>('get_circle', [params.circleId]);
  }

  async getReputation(params: GetReputationParams): Promise<Reputation> {
    const rep = await this.invokeContract<{
      address: string;
      score: bigint;
      contributions: number;
      missed: number;
    }>('get_reputation', [params.address]);

    return {
      ...rep,
      tier: this.computeTier(rep.score),
    };
  }

  async hasContributed(params: HasContributedParams): Promise<boolean> {
    return this.invokeContract<boolean>('has_contributed', [
      params.circleId,
      params.address,
      params.cycle,
    ]);
  }

  async restartCircle(params: RestartCircleParams): Promise<void> {
    await this.invokeContract<void>('restart_circle', [params.circleId]);
  }

  async vouch(params: VouchParams): Promise<void> {
    await this.invokeContract<void>('vouch', [params.address]);
  }

  async getVouches(params: GetVouchesParams): Promise<number> {
    return this.invokeContract<number>('get_vouches', [params.address]);
  }

  async propose(params: ProposeParams): Promise<number> {
    return this.invokeContract<number>('propose', [
      params.circleId,
      params.proposalType,
      BigInt(params.newValue),
      params.targetAddress,
    ]);
  }

  async vote(params: VoteParams): Promise<void> {
    await this.invokeContract<void>('vote', [
      params.circleId,
      params.proposalId,
      params.vote,
    ]);
  }

  async executeProposal(params: ExecuteProposalParams): Promise<void> {
    await this.invokeContract<void>('execute_proposal', [
      params.circleId,
      params.proposalId,
    ]);
  }

  async getProposal(params: GetProposalParams): Promise<Proposal> {
    return this.invokeContract<Proposal>('get_proposal', [
      params.circleId,
      params.proposalId,
    ]);
  }

  private validateCreateParams(params: CreateCircleParams): void {
    if (!params.members || params.members.length === 0) {
      throw new TrustCircleError(ErrorCode.EmptyMembers, 'At least one member is required');
    }

    const uniqueMembers = new Set(params.members);
    if (uniqueMembers.size !== params.members.length) {
      throw new TrustCircleError(ErrorCode.DuplicateMembers, 'All members must have unique addresses');
    }

    if (params.contributionAmount <= 0) {
      throw new TrustCircleError(ErrorCode.InvalidAmount, 'Contribution amount must be positive');
    }

    if (params.cycleLength < 3600 || params.cycleLength > 31536000) {
      throw new TrustCircleError(
        ErrorCode.InvalidCycleLength,
        'Cycle length must be between 1 hour and 1 year'
      );
    }
  }

  private computeTier(score: bigint): ReputationTier {
    if (score >= 100) return 'trusted';
    if (score >= 50) return 'building_trust';
    return 'new_member';
  }

  private async invokeContract<T>(method: string, args: unknown[]): Promise<T> {
    // TODO: Implement actual Soroban RPC calls
    // This is a placeholder that will be connected to the Stellar SDK
    throw new TrustCircleError(
      ErrorCode.TransferFailed,
      `Contract invocation for ${method} not yet implemented`
    );
  }
}
