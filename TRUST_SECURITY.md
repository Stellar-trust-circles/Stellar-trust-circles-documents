# Trust and Security Model

This document explains, in plain language, why Trust Circles is safe to use and what its actual guarantees are. It is written for circle members and organizers, not developers — for the technical security policy, see `SECURITY.md` in the `contracts` repository.

---

## What the smart contract guarantees

When you join a Trust Circle, you are trusting code, not a person. Specifically, the contract guarantees:

- **No one can take your contribution early.** Funds you contribute are held by the contract itself, not by the circle admin or any other member, until the contract's own rules release them.
- **Payout order cannot be changed by one person.** The rotation order is fixed when the circle is created and only changes through a full member vote, never by admin decision alone.
- **Every action is recorded permanently.** Every contribution, payout, vouch, and vote is stored on the Stellar blockchain and cannot be edited or deleted afterward, by anyone, including the project's own team.
- **The admin has limited powers.** A circle admin can release a payout early or restart a finished circle, but cannot withdraw funds for themselves, skip a member, or change who receives a payout.

## What the smart contract does not guarantee

Being honest about limits is part of building trust:

- **It cannot make someone contribute.** If a member misses a contribution, the contract penalizes their reputation and proceeds with a smaller payout — it cannot force a person to pay.
- **It cannot recover funds sent to the wrong address.** Stellar transactions, like most blockchain transactions, cannot be reversed. Always double-check addresses before contributing or vouching.
- **It is not insured.** Unlike a bank deposit, funds held in a Trust Circle are not covered by any deposit insurance scheme.
- **It cannot verify real-world identity.** Reputation and vouching create a web of on-chain trust, but they do not confirm someone's legal identity.

## Why we use Stellar specifically

Stellar was chosen deliberately, not by default:

- Transaction fees are a fraction of a cent, which matters when contributions are as small as $5
- Transactions confirm in 3 to 5 seconds, so payouts feel immediate
- USDC on Stellar is a regulated, dollar-pegged stablecoin, removing the price volatility risk that would make any other cryptocurrency unsuitable for savings

## Wallet security

Trust Circles uses Freighter, a non-custodial browser wallet. "Non-custodial" means:

- Your private keys live only in your own browser extension, never on any Trust Circles server
- No one at Trust Circles can access your funds, sign a transaction on your behalf, or recover your wallet if you lose access to it
- You are responsible for keeping your wallet's recovery phrase safe — if it is lost, it cannot be reset by anyone

## Smart contract audit status

The Trust Circle contract has **not yet completed a third-party security audit** as of this writing. Mainnet deployment — meaning real USDC with real value — will not happen until that audit is complete and its findings are resolved. This is documented as a hard requirement in the project's `AUDIT_CHECKLIST.md`. Testnet, used during development, never involves real funds.

## What to do if something seems wrong

If a circle, transaction, or message seems suspicious:

- Verify the contract ID you are interacting with matches the official one published in the `contracts` repository README
- Never share your Freighter recovery phrase with anyone, including someone claiming to be from the Trust Circles team
- Report suspected vulnerabilities privately per `SECURITY.md` rather than discussing them publicly