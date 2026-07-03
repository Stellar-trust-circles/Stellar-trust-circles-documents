# Glossary

Plain-language definitions of every term used across Trust Circles documentation. If a term in `INTEGRATION.md`, `USER_GUIDE.md`, or `ARCHITECTURE.md` isn't immediately clear, check here first.

---

**ROSCA** — Rotating Savings and Credit Association. The general financial category Trust Circles digitizes, known locally as *ajo* (Nigeria), *chama* (Kenya), *tanda* (Latin America), and *susu* (Caribbean).

**Circle** — One instance of a rotating savings group running on the Trust Circles contract. Has a fixed member list, a contribution amount, and a cycle length.

**Cycle** — One full round of contribution collection followed by a single payout. A circle with 5 members takes 5 cycles to complete one full rotation.

**Rotation** — The complete sequence of payouts across all members of a circle, from the first recipient to the last.

**Contribution** — The fixed amount of USDC a member deposits into the circle's escrow during a given cycle.

**Payout** — The full pooled contribution amount released to one member at the end of a cycle.

**Escrow** — Funds held by the smart contract itself rather than by any individual person, released only according to the contract's programmed rules.

**Stroop** — The smallest indivisible unit of any Stellar asset. 10,000,000 stroops equal 1 USDC in this protocol. The contract stores all amounts in stroops to avoid floating-point precision issues.

**Soroban** — Stellar's native smart contract platform. The Trust Circle contract is written in Rust and compiled to WebAssembly to run on Soroban.

**Stellar** — The Layer 1 blockchain network Trust Circles is built on, chosen for its low transaction fees and fast settlement.

**Freighter** — A free, non-custodial browser extension wallet used to connect to Trust Circles and sign transactions. Trust Circles never has access to a user's private keys.

**Testnet** — Stellar's test network, used for development and demonstration. Funds on Testnet have no real-world value.

**Mainnet** — Stellar's production network, where real USDC with real value is used. Trust Circles requires a completed security audit before any Mainnet deployment.

**Reputation score** — A number attached to a Stellar address on-chain, increasing by 10 for each on-time contribution and decreasing by 20 for each missed one, never going below 0.

**Reputation tier** — A human-readable label derived from the reputation score: New Member (0–49), Building Trust (50–99), Trusted (100+).

**Vouch** — An on-chain endorsement from a member with at least 50 reputation, supporting a newcomer's trustworthiness before they join a circle.

**Governance proposal** — A request submitted by any circle member to change a circle rule, such as the contribution amount, cycle length, or member list.

**Majority** — The voting threshold required to pass a governance proposal: strictly more than half of the circle's total members must vote yes.

**Admin** — The Stellar address that created a circle. Has the ability to release payouts early and restart a completed circle, but otherwise follows the same contribution rules as every other member.

**Contract ID** — The unique on-chain address of a deployed Soroban contract, always starting with the letter `C`.

**Horizon / Soroban RPC** — The network services used to read blockchain state and submit transactions. The frontend communicates with these directly; there is no Trust Circles backend server in between.

**require_auth** — A Soroban SDK function that cryptographically verifies a transaction was actually authorized by the address it claims to be from, preventing impersonation.

**Saturating arithmetic** — A math operation that stops at a boundary (such as 0) instead of wrapping around to a very large or negative number. Used for reputation so a heavily penalized score cannot go negative.