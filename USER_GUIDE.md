# User Guide

> **New here?** Check the [Glossary](glossary.md) for plain-language definitions of every term used in this guide.

This guide explains how to use Trust Circles to join or create a savings group. It is written for people with no blockchain or cryptocurrency background. If you can use a smartphone app, you can use Trust Circles.

---

## What is Trust Circles?

Trust Circles is a digital savings group. Instead of a bank or a person holding your group's money, a computer program (called a smart contract) holds it and follows rules that everyone agreed to when the group was formed.

Think of it like a digital version of a traditional savings group where:
- You and a group of people agree to save the same amount every week
- Each week, one person receives the full pot
- The order is decided in advance
- No single person controls the money

The difference is that Trust Circles runs on the Stellar network, which means:
- The rules are enforced by code, not by trust alone
- Every contribution and payout is recorded permanently
- No one — not even the people who built Trust Circles — can change the rules after the group starts

---

## Getting Started

### Step 1: Install Freighter

Freighter is a free browser extension that acts as your digital wallet. It stores your Stellar account and lets you approve transactions.

1. Go to [freighter.app](https://freighter.app)
2. Install the browser extension for Chrome, Firefox, or Brave
3. Create a new account and write down your recovery phrase somewhere safe
4. **Never share your recovery phrase with anyone**

### Step 2: Get Test USDC

Before using Trust Circles with real money, you should practice on the test network where the money has no real value.

1. Open Freighter and make sure you are on the Testnet network
2. Visit the [Stellar testnet faucet](https://testnet.stellar.org) to get free test USDC
3. You should see a small balance appear in your wallet

### Step 3: Connect to Trust Circles

1. Go to the Trust Circles application
2. Click "Connect Wallet" in the top right corner
3. Freighter will ask you to approve the connection — click "Allow"
4. You should see your wallet address and balance displayed

---

## Joining an Existing Circle

If someone has invited you to join their savings group:

### Accepting an Invitation

1. The circle creator will send you a link or tell you the circle ID
2. Open Trust Circles and navigate to "My Circles"
3. Click "Join Circle" and enter the circle ID
4. Review the circle details:
   - How much everyone contributes each cycle
   - How long each cycle lasts
   - Who else is in the group
5. Click "Join" and approve the transaction in Freighter

### Making Your First Contribution

1. Go to your circle's dashboard
2. You will see a "Contribute" button if the current cycle is open
3. Click "Contribute" — Trust Circles will ask Freighter to approve a transfer of your contribution amount
4. Review the transaction details in Freighter:
   - Amount: the circle's contribution amount
   - Recipient: the Trust Circle smart contract (not a person)
5. Click "Approve" to complete your contribution
6. You will see a confirmation on screen and a record in your transaction history

### What Happens Next

- At the end of each cycle, the full pot is released to one member
- The order is determined when the circle is created and cannot be changed by one person
- After all members have received once, the circle ends
- You can see the payout schedule in your circle's dashboard

---

## Creating a New Circle

If you want to start your own savings group:

### Step 1: Gather Your Group

Before creating a circle, make sure you have:
- At least 2 other people who want to join
- Everyone has a Stellar account with Freighter installed
- Everyone has enough USDC to cover the contribution amount for the full rotation
- Agreement on the contribution amount and cycle length

### Step 2: Create the Circle

1. Open Trust Circles and click "Create Circle"
2. Enter the circle details:
   - **Members**: Add each person's Stellar address (they can find this in Freighter)
   - **Contribution amount**: How much each person contributes per cycle (e.g., 5 USDC)
   - **Cycle length**: How long each cycle lasts (e.g., 1 week)
3. Review the summary:
   - Total pot per cycle: contribution amount × number of members
   - Total rotation time: cycle length × number of members
4. Click "Create" and approve the transaction in Freighter

### Step 3: Share the Circle

After creating the circle:
- Share the circle ID with all members
- Remind everyone to contribute before each cycle deadline
- You can see all contributions in the circle dashboard

### Your Role as Admin

As the circle creator (admin), you have two special powers:
1. **Release payout**: If all members have contributed, you can release the payout before the cycle deadline
2. **Restart circle**: After all cycles complete, you can restart the circle for another rotation

You **cannot**:
- Withdraw funds for yourself
- Skip a member
- Change the contribution amount or cycle length without a member vote
- Remove a member without a member vote

---

## Understanding Your Reputation

Every member has an on-chain reputation score that tracks their reliability:

### How Scores Change

- **On-time contribution**: +10 points
- **Missed contribution**: -20 points
- **Vouching for someone**: +2 points
- **Being vouched for**: +5 points

Your score never goes below zero.

### Reputation Tiers

| Score | What It Means |
|-------|--------------|
| 0–49 | New member — you are building your track record |
| 50–99 | Building trust — you can now vouch for others |
| 100+ | Trusted — you have a strong track record and can be a circle admin |

### Why Reputation Matters

- Circles may require a minimum reputation score to join
- Higher reputation makes you a more attractive circle member
- Your reputation persists across multiple circles
- It is stored permanently on the Stellar network

---

## Vouching for Someone

If you have a reputation score of 50 or higher, you can vouch for a new member:

1. Go to the "Vouch" section in Trust Circles
2. Enter the address of the person you want to vouch for
3. Review the cost: you lose 5 reputation points, they gain 5
4. Click "Vouch" and approve the transaction

Each person can receive a maximum of 3 vouches total. You can vouch for as many people as your reputation allows.

---

## Governance Voting

Any member can propose changes to their circle's rules. All members vote, and changes require a majority.

### Making a Proposal

1. Go to your circle's dashboard and click "Governance"
2. Click "New Proposal"
3. Choose what you want to change:
   - Contribution amount
   - Cycle length
   - Add a new member
   - Remove a member
   - Change the admin
4. Enter the new value or select the member
5. Submit the proposal

### Voting on a Proposal

1. Go to the Governance section of your circle
2. You will see all open proposals
3. Click on a proposal to see the details
4. Vote "Yes" or "No"
5. Each member gets one vote per proposal
6. Voting stays open for 48 hours

### What Happens After Voting

- If more than half the members vote yes, the proposal passes
- Only the admin can execute a passed proposal
- The change takes effect immediately after execution
- If the proposal fails, it cannot be resubmitted for the same change within one cycle

---

## Checking Your Activity

### Transaction History

Every contribution, payout, vouch, and vote is recorded permanently. You can view your history in Trust Circles or look it up on [Stellar Expert](https://stellar.expert).

### Circle Dashboard

Your circle dashboard shows:
- Current cycle number and deadline
- Which members have contributed this cycle
- Total pot size
- Payout schedule
- Active governance proposals
- Each member's reputation score

---

## What If Something Goes Wrong?

### I Missed a Contribution

- Your reputation score decreases by 20 points
- The cycle continues with the remaining contributions
- The payout to the recipient is smaller than expected
- You can still contribute in future cycles

### Someone Else Missed a Contribution

- The same things happen to their reputation
- The payout will be smaller but still released
- You can propose a governance vote to remove the member if this keeps happening

### I Sent USDC to the Wrong Address

Unfortunately, transactions on the Stellar network cannot be reversed. Always double-check addresses before approving any transaction in Freighter.

### The Circle Seems Suspicious

1. Verify the contract ID matches the official one in the Trust Circles documentation
2. Do not interact with the circle
3. Report it through the Trust Circles support channel

---

## Glossary Quick Reference

| Term | Plain Language |
|------|---------------|
| Circle | A savings group running on Trust Circles |
| Cycle | One round where everyone contributes and one person gets paid |
| Contribution | The fixed amount you pay each cycle |
| Payout | The full pot you receive when it is your turn |
| Admin | The person who created the circle |
| Reputation | Your on-chain score that tracks reliability |
| Vouch | An endorsement from a trusted member |
| Proposal | A suggested change to circle rules |
| Freighter | Your digital wallet browser extension |
| USDC | A digital dollar that keeps a stable value |
| Testnet | The practice network where money has no real value |
| Mainnet | The real network where money has real value |

---

## Need Help?

- Check the [FAQ](docs/FAQ.md) for common questions
- Read the [Trust and Security Model](TRUST_SECURITY.md) to understand what is and is not guaranteed
- Open an issue on the [GitHub repository](https://github.com/Stellar-trust-circles/Stellar-trust-circles-documents/issues)
