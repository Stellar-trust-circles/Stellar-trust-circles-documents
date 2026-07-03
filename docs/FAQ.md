# Frequently Asked Questions

## General

### What is Trust Circles?

Trust Circles is a decentralized rotating savings group protocol built on the Stellar blockchain. It digitizes traditional savings groups (known as *ajo*, *chama*, *tanda*, or *susu* in different regions) using smart contracts, so the rules are enforced by code rather than trust alone.

### Is Trust Circles a bank?

No. Trust Circles does not hold deposits, lend money, or provide any banking services. It is a peer-to-peer protocol where groups of people save together using code-enforced rules.

### Does Trust Circles charge fees?

The Stellar network charges a small transaction fee (less than $0.001) for each operation. Trust Circles itself does not charge any additional fees.

### What is the minimum contribution amount?

There is no protocol-enforced minimum. However, since Stellar transactions cost a fraction of a cent, contributions as small as $1 are economically viable. The actual minimum depends on what the circle members agree on.

### What is the maximum number of members per circle?

There is no hard limit in the contract. However, circles with more than 20 members may become unwieldy. We recommend 3–15 members per circle.

---

## Getting Started

### Do I need cryptocurrency to use Trust Circles?

You need USDC (a dollar-pegged stablecoin) on the Stellar network. USDC maintains a 1:1 value with the US dollar, so there is no price volatility risk.

### How do I get USDC?

You can buy USDC on a cryptocurrency exchange that supports Stellar, then withdraw it to your Freighter wallet. On testnet, you can get free test USDC from the Stellar testnet faucet.

### What is Freighter?

Freighter is a free, non-custodial browser extension wallet for the Stellar network. It stores your private keys in your browser and lets you approve transactions. Trust Circles never has access to your keys.

### Can I use Trust Circles on my phone?

The Trust Circles web application works on mobile browsers. Freighter is available as a browser extension on desktop browsers. A dedicated mobile app is on the roadmap.

### What happens if I lose access to my Freighter wallet?

If you lose access to your Freighter wallet and do not have your recovery phrase, you will lose access to your Stellar account. Trust Circles cannot recover your wallet for you. Always back up your recovery phrase in a safe location.

---

## Circles

### How do I join an existing circle?

You need the circle ID from the circle creator. Open Trust Circles, click "Join Circle," enter the circle ID, and approve the transaction in Freighter.

### Can I leave a circle before it completes?

The protocol does not have a built-in "leave" function. If you need to exit a circle, you should discuss it with the other members. A governance proposal can be used to remove a member, but this requires a majority vote.

### What happens if someone misses a contribution?

- Their reputation score decreases by 20 points
- The cycle continues with the remaining contributions
- The payout to the recipient is smaller than expected
- The circle continues to the next cycle

### Can the admin change the rules without asking?

No. The admin can only release payouts early and restart completed circles. Any rule changes (contribution amount, cycle length, member list) require a governance proposal and majority vote.

### Can I contribute more than the required amount?

No. The contract enforces a fixed contribution amount per circle. If you want to contribute a different amount, you need to create a new circle with a different configuration.

### What happens if the cycle deadline passes before everyone contributes?

The payout is released with whatever contributions were received. Members who did not contribute face a reputation penalty. The circle continues to the next cycle.

---

## Reputation

### How is my reputation score calculated?

- +10 points for each on-time contribution
- -20 points for each missed contribution (never below 0)
- +5 points when someone vouches for you
- -5 points when you vouch for someone (the vouch target gains +5)
- +2 points when you successfully vouch for someone

### Can I lose my reputation?

Your score can decrease due to missed contributions, but it never goes below zero. There is no way to reset or delete your reputation.

### Does my reputation carry across circles?

Yes. Your reputation score is tied to your Stellar address and persists across all circles you participate in.

### What are the reputation tiers?

| Score | Tier | Capabilities |
|-------|------|--------------|
| 0–49 | New Member | Can join circles, cannot vouch |
| 50–99 | Building Trust | Can vouch for others |
| 100+ | Trusted | Can vouch, can be circle admin |

---

## Governance

### What can I propose?

- Change the contribution amount
- Change the cycle length
- Add a new member
- Remove an existing member
- Change the circle admin

### How does voting work?

- Any member can submit a proposal
- All members can vote yes or no
- Voting stays open for 48 hours
- A proposal passes if strictly more than 50% of members vote yes
- Only the admin can execute a passed proposal

### Can I change the payout order?

No. The payout order is fixed when the circle is created and cannot be changed by any means, including governance proposals.

### Can I propose to add myself?

No. Proposals to add members require a `target_address` parameter specifying who to add, and the proposer cannot add themselves.

---

## Security

### Is Trust Circles safe?

Trust Circles uses a smart contract that holds funds in escrow and enforces rules automatically. The contract has not yet been audited by a third-party security firm. Use testnet for practice before using real funds.

### Can the Trust Circles team access my funds?

No. There is no backend server and no administrator key that can move funds. The smart contract is the only entity that controls the escrowed USDC, and it follows rules that cannot be changed without majority member vote.

### What if the smart contract has a bug?

Until a formal audit is completed, there is a risk of undiscovered bugs. The project follows responsible disclosure practices — see [SECURITY.md](../SECURITY.md) for how to report vulnerabilities.

### Can transactions be reversed?

No. Stellar transactions are final once confirmed. If you send USDC to the wrong address, it cannot be recovered.

---

## Technical

### What blockchain is Trust Circles built on?

Trust Circles is built on the Stellar network using Soroban smart contracts. The contract is written in Rust and compiled to WebAssembly.

### What token does Trust Circles use?

Trust Circles uses USDC (USD Coin) on the Stellar network. USDC is a regulated, dollar-pegged stablecoin.

### Is there an API?

Yes. See [INTEGRATION.md](../INTEGRATION.md) for the full contract API reference. SDKs are available for JavaScript/TypeScript and Python.

### Can I run Trust Circles on a private network?

Yes. The contract can be deployed to Stellar Standalone (local development) or Futurenet. See the [Deployment Guide](DEPLOYMENT_GUIDE.md) for details.

### Where is the source code?

- Smart contracts: [github.com/Stellar-trust-circles/contracts](https://github.com/Stellar-trust-circles/STC-smart-contracts)
- Frontend: [github.com/Stellar-trust-circles/frontend](https://github.com/Stellar-trust-circles/Stellar-trust-circles-frontend)
- Documentation: [github.com/Stellar-trust-circles/documents](https://github.com/Stellar-trust-circles/Stellar-trust-circles-documents)
