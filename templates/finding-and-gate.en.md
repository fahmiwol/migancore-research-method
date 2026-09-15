# Finding entry

- **F-NNN — <one-line claim, as specific as a headline>.** <What was observed, with the
  number.> <How it was measured, and on what n.> <The evidence: file, commit, command.>
  <What was NOT shown.> <What changes because of it.> Law: **Cnn** (if any). Guard:
  `<test file>` (if any).

A finding is closed only when it exists as three things:

| form | where |
|---|---|
| document | this log, in the project repository |
| skill | a reusable procedure, if the method generalises |
| knowledge | a short rule with evidence in the shared knowledge base |

---

# Candidate gate

| candidate | G1 runs by end of session | G2 measurable against an existing baseline | G3 falsifiable | decision | reason |
|---|---|---|---|---|---|
| | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | chosen / postponed / waiting for a decision / discarded | the gate it failed, or the dependency |

Discarded candidates stay in the table. The reason is the useful part.

---

# Law entry

## Cnn — <the rule in one sentence>

**Incident (date).** What happened, with numbers.

**Mechanism.** Why it happened.

**Coded consequence.** The guard that now fails when the rule is broken, added in the
same commit.

**Sibling laws.** Which earlier laws describe the same family of failure.

**General pattern.** One sentence another lab could use.
