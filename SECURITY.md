# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in the Trust Circles contracts or SDKs, please report it responsibly. **Do not open a public GitHub issue for security vulnerabilities.**

### How to Report

1. Email [security@stellar-trust-circles.org](mailto:security@stellar-trust-circles.org) with a description of the vulnerability
2. Include steps to reproduce if possible
3. Include the potential impact assessment
4. If you have a fix, include it or describe your suggested approach

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Assessment**: We will assess the severity and impact within 5 business days
- **Resolution**: Critical vulnerabilities will be patched within 14 days of confirmation
- **Disclosure**: We will coordinate with you on public disclosure timing

### Severity Levels

| Severity | Description | Response Time |
|----------|-------------|---------------|
| Critical | Direct fund loss, contract drain, authentication bypass | 24 hours |
| High | Indirect fund loss, reputation manipulation, governance bypass | 72 hours |
| Medium | Information disclosure, denial of service | 1 week |
| Low | Minor issues, best practice violations | 2 weeks |

### Scope

The following are in scope for vulnerability reports:

- Trust Circle Soroban smart contracts
- JavaScript/TypeScript SDK
- Python SDK
- CLI tools
- Frontend application (if applicable)

The following are **out of scope**:

- Third-party wallet implementations (Freighter, etc.)
- Stellar network consensus vulnerabilities
- Social engineering attacks
- Physical security

### Safe Harbor

We support safe harbor for security researchers. We will not pursue legal action against researchers who:

- Make a good faith effort to avoid privacy violations and data destruction
- Only interact with accounts you own or with explicit permission of the account holder
- Do not exploit a vulnerability beyond what is necessary to confirm its existence
- Stop and report immediately once you have confirmed the vulnerability

### Bug Bounty

We may offer bug bounties for confirmed vulnerabilities. The bounty amount depends on severity:

| Severity | Bounty Range |
|----------|-------------|
| Critical | $500 – $5,000 |
| High | $200 – $500 |
| Medium | $50 – $200 |
| Low | $10 – $50 |

Bounties are paid in USDC on Stellar.

## Security Best Practices for Users

1. **Never share your Freighter recovery phrase** with anyone, including team members
2. **Verify contract IDs** before interacting — check the official README
3. **Start with testnet** to understand the flow before using mainnet
4. **Check transaction details** before signing in Freighter
5. **Report suspicious activity** immediately

## Smart Contract Audit

The Trust Circle contract has **not yet completed a third-party security audit**. Mainnet deployment will not occur until:

- A complete audit is performed by a qualified firm
- All critical and high findings are resolved
- The audit report is published publicly

Testnet usage during development does not involve real funds.
