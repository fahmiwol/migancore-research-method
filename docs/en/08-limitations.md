# 08 — Limitations

This method is the practice of one small lab. It has real weaknesses, and some of them are
structural.

## Of the evidence

- **Small samples.** The main abstention set has 36 public questions per round; question
  types have 4–8 items. Per-type rates move several points with a single answer.
- **One language, one model family.** Almost all measurements are Indonesian and on
  Qwen3-4B derivatives. Nothing here is shown to transfer.
- **Automatic scorers.** Most verdicts rest on regex scorers whose defects are documented
  in [03](03-measurement-integrity.md). Blinded adjudication by a second model is being
  introduced; there is still no human inter-annotator agreement for most labels.
- **Laws come from incidents, not from replication.** Each law is well supported by the
  incident that produced it and by the guard that enforces it. None has been validated
  across independent labs.

## Of the process

- **The designer is also the analyst.** Pre-registration, external critique and blinded
  adjudication reduce this, but do not remove it.
- **The lock is a commit in a private repository.** It proves ordering inside the project,
  not to an outside auditor. A public timestamping service (for example a public
  pre-registration registry) would be stronger.
- **AI agents are the staff, and they make recurring process mistakes** — claiming a run
  was alive without checking, writing timestamps from memory, launching too many parallel
  agents. The records name these mistakes; they have not been eliminated.
- **Compute limits change what can be asked.** Some stronger controls (cluster-level
  significance, many more rounds) are reported rather than enforced, because making them
  gates would create thresholds that cannot be won.

## Of the inspirations

- Cognitive science and the Quran Lab are used as **sources of design hypotheses**, never
  as evidence for a result. An analogy that inspires an experiment is only as good as the
  experiment.

## Of this publication

- It excludes model weights, private data and infrastructure, so the experiments cannot be
  replicated exactly; the method can.
- Some internal documents it summarises were written in Indonesian and translated; nuance
  may be lost.
