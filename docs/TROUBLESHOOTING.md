# Troubleshooting

Common issues and their solutions when using Trust Circles.

---

## Wallet Issues

### Freighter is not connecting

**Symptoms:** Clicking "Connect Wallet" does not open Freighter, or Freighter does not respond.

**Solutions:**
1. Make sure Freighter is installed and enabled in your browser
2. Check that Freighter is unlocked (enter your password)
3. Make sure you are on the correct network (Testnet or Mainnet)
4. Try refreshing the page and clicking "Connect Wallet" again
5. Check that the Freighter extension is not blocked by your browser's extension settings

### Transaction rejected in Freighter

**Symptoms:** Freighter shows "Transaction Rejected" when you try to contribute or create a circle.

**Solutions:**
1. Check that you have enough USDC in your wallet for the contribution
2. Check that you have enough XLM to cover transaction fees (at least 1 XLM recommended)
3. Make sure you are on the correct network
4. If the error says "op_underfunded," you do not have enough USDC
5. If the error says "tx_bad_auth," check that you are using the correct account in Freighter

### Wrong network selected

**Symptoms:** Transactions fail or you see unexpected balances.

**Solutions:**
1. Open Freighter and check which network is selected in the top dropdown
2. Switch to the correct network (Testnet for practice, Mainnet for real funds)
3. Note: balances on Testnet have no real-world value

---

## Circle Issues

### Cannot create circle

**Symptoms:** The "Create Circle" button does not work or returns an error.

**Solutions:**
1. Make sure you have at least 2 other member addresses
2. All member addresses must be valid Stellar addresses (starting with G)
3. Contribution amount must be greater than 0
4. Cycle length must be between 1 hour (3600 seconds) and 1 year (31536000 seconds)
5. All member addresses must be unique

### Cannot contribute

**Symptoms:** Clicking "Contribute" returns an error.

**Solutions:**
1. Make sure you are a member of the circle
2. Make sure the current cycle is still open (has not passed the deadline)
3. Make sure you have not already contributed this cycle
4. Make sure you have enough USDC in your wallet
5. Make sure you have approved the contract to spend your USDC

### Contribution shows as "late"

**Symptoms:** Your contribution was recorded but marked as late, and you received a reputation penalty.

**Solutions:**
- Contributions after the cycle deadline are marked as late
- Late contributions still go into the pool but reduce your reputation by 20 points
- Make sure to contribute before the deadline shown in the circle dashboard

### Payout not releasing

**Symptoms:** The cycle has ended but the payout has not been released.

**Solutions:**
1. Check that the cycle deadline has actually passed (not just close to it)
2. Only the admin or the next recipient can release the payout
3. If you are the admin, try clicking "Release Payout" in the circle dashboard
4. If you are not the admin or next recipient, you cannot release the payout

---

## Reputation Issues

### Reputation score not updating

**Symptoms:** You contributed but your reputation score has not changed.

**Solutions:**
- Reputation updates are recorded on-chain and may take a few seconds to appear
- Refresh the page or check again after a minute
- If the contribution was late, the penalty (-20) may have offset the gain (+10)

### Cannot vouch for someone

**Symptoms:** The "Vouch" button returns an error.

**Solutions:**
1. You need a reputation score of at least 50 to vouch
2. The person you are vouching for cannot already have 3 vouches
3. You cannot vouch for yourself
4. You cannot vouch for someone you already vouched for

---

## Governance Issues

### Cannot submit proposal

**Symptoms:** The "New Proposal" button returns an error.

**Solutions:**
1. You must be a member of the circle
2. The circle must be active
3. You cannot submit a duplicate proposal (same type and value as an existing open proposal)

### Cannot vote on proposal

**Symptoms:** The "Vote" button returns an error.

**Solutions:**
1. You must be a member of the circle
2. You can only vote once per proposal
3. Voting must still be open (within 48 hours of proposal submission)

### Proposal passed but not executing

**Symptoms:** The vote count shows majority yes, but the proposal has not taken effect.

**Solutions:**
1. Only the admin can execute a passed proposal
2. Check with the circle admin to execute the proposal
3. Make sure the voting period has ended (48 hours)

---

## General Issues

### Transaction stuck pending

**Symptoms:** A transaction shows as "pending" for a long time.

**Solutions:**
1. Stellar transactions typically confirm in 3–5 seconds
2. If stuck for more than a minute, check the transaction status on [Stellar Expert](https://stellar.expert)
3. Try refreshing the page
4. If the transaction failed, it will be marked as such and you can retry

### Balance shows incorrect amount

**Symptoms:** Your USDC balance in Trust Circles does not match your Freighter balance.

**Solutions:**
1. Refresh the page to sync with the latest ledger state
2. Check that you are on the correct network
3. If you recently received USDC, it may take a moment to appear
4. Check your balance directly on [Stellar Expert](https://stellar.expert)

### Error: "Contract not found"

**Solutions:**
1. Make sure you are on the correct network
2. Verify the contract ID matches the one in the official documentation
3. If on testnet, the contract may have been redeployed — check for updated contract IDs

---

## Getting More Help

If your issue is not covered here:

1. Check the [FAQ](FAQ.md) for additional common questions
2. Search existing [GitHub Issues](https://github.com/Stellar-trust-circles/Stellar-trust-circles-documents/issues) for similar problems
3. Open a new issue with:
   - A clear description of the problem
   - Steps to reproduce
   - Any error messages you received
   - Your browser and Freighter version
