export enum ErrorCode {
  EmptyMembers = 'EMPTY_MEMBERS',
  DuplicateMembers = 'DUPLICATE_MEMBERS',
  InvalidAmount = 'INVALID_AMOUNT',
  InvalidCycleLength = 'INVALID_CYCLE_LENGTH',
  NotMember = 'NOT_MEMBER',
  CircleInactive = 'CIRCLE_INACTIVE',
  AlreadyContributed = 'ALREADY_CONTRIBUTED',
  CycleClosed = 'CYCLE_CLOSED',
  TransferFailed = 'TRANSFER_FAILED',
  NotAuthorized = 'NOT_AUTHORIZED',
  CycleNotEnded = 'CYCLE_NOT_ENDED',
  CircleActive = 'CIRCLE_ACTIVE',
  NotAdmin = 'NOT_ADMIN',
  InsufficientReputation = 'INSUFFICIENT_REPUTATION',
  MaxVouchesReached = 'MAX_VOUCHES_REACHED',
  AlreadyVouched = 'ALREADY_VOUCHED',
  CannotVouchSelf = 'CANNOT_VOUCH_SELF',
  InvalidProposalType = 'INVALID_PROPOSAL_TYPE',
  DuplicateProposal = 'DUPLICATE_PROPOSAL',
  AlreadyVoted = 'ALREADY_VOTED',
  VotingClosed = 'VOTING_CLOSED',
  ProposalNotFound = 'PROPOSAL_NOT_FOUND',
  VotingStillOpen = 'VOTING_STILL_OPEN',
  NotPassed = 'NOT_PASSED',
  AlreadyExecuted = 'ALREADY_EXECUTED',
}

export class TrustCircleError extends Error {
  code: ErrorCode;
  details?: unknown;

  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = 'TrustCircleError';
    this.code = code;
    this.details = details;
  }
}
