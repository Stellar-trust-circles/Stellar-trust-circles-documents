# Contributing to Documentation

This repository contains no executable code — every contribution is a Markdown file. This guide covers what makes a good contribution here specifically, distinct from the code-contribution guides in `contracts` and `frontend`.

---

## Before you start

Read the four existing documents to understand the tone and audience split:

| Document | Audience | Tone |
|----------|----------|------|
| `ARCHITECTURE.md` | Developers, technical contributors | Precise, system-level |
| `INTEGRATION.md` | Developers building against the contract | Step-by-step, exhaustive on parameters and errors |
| `USER_GUIDE.md` | Circle members, no blockchain background | Plain language, zero jargon, honest about limitations |
| `TRUST_AND_SECURITY.md` | Circle members and organizers | Calm, honest, explicit about what is and isn't guaranteed |

A contribution that mixes tones — for example, technical jargon inside `USER_GUIDE.md` — will be asked to revise before merge, even if the information is correct.

## The maintenance rule

This is the most important rule in this repository: **documentation here must stay synchronized with the other two repositories.**

- A pull request to `contracts` that adds, removes, or changes a public function signature must update `INTEGRATION.md` in the same release cycle
- A pull request to `frontend` that changes a user-facing flow described in `USER_GUIDE.md` must update that file in the same release cycle

If you notice documentation that has drifted out of sync with the actual code, that is a valid and welcome issue to open here, even if you didn't write the original code change.

## Style guidelines

- Write in full sentences, not sentence fragments or marketing-style phrases
- Avoid exclamation points and hype language — the product's tone is calm and trustworthy, and the docs should match
- When referencing a contract function, use exact lowercase `snake_case` names matching `lib.rs` (e.g. `release_payout`, not "Release Payout")
- When writing for `USER_GUIDE.md` or `TRUST_AND_SECURITY.md`, never use the words "smart contract," "blockchain," or "on-chain" without immediately explaining what that means in context — assume zero prior exposure
- Every new term introduced should also be added to `GLOSSARY.md` in the same pull request

## Adding a new document

1. Determine which audience it serves and match it to the closest existing document's tone
2. Add it under `docs/`
3. Link it from `README.md`'s document index table
4. If it introduces new terminology, add entries to `GLOSSARY.md`
5. If it answers a question someone might reasonably ask, consider also adding a short entry to `FAQ.md` that links to it

## Review checklist for documentation PRs

- [ ] Tone matches the target audience (see table above)
- [ ] No unexplained jargon for user-facing documents
- [ ] Function names, parameter names, and event names match the current `lib.rs` exactly
- [ ] New terms added to `GLOSSARY.md`
- [ ] Links to and from `README.md` are updated if a new file was added
- [ ] No marketing language, hype, or unverified claims about security or returns