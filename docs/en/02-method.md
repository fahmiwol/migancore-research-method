# 02 — The research method

This is the method as it is actually practised, including the parts that were added
because something went wrong. Each rule names the incident that produced it, so the
reader can judge whether the rule applies to their own work.

---

## 1. Constraints shape the method

- **No local GPU.** Measurement runs on a laptop-class CPU (Intel Core Ultra 5 115U,
  16 GB RAM, served with Ollama). One 36-question round of the base model with its
  default reasoning mode takes **2.5–2.8 hours**. Five rounds is a working day.

  > **Correction (23 September 2026).** "The base model with its default reasoning mode" is
  > **Qwen3-4B-Thinking-2507**; the Instruct-2507 base the project fine-tunes from has no
  > reasoning mode. Its round time will be reported with the new anchor.
- **Rented GPU is occasional** and paid per hour, so training runs are small LoRA
  adapters, and a failed run is money.
- **One founder, AI agents as staff.** Agents lose context when a conversation is
  compacted and repeat mistakes they already made. Anything not written down is lost.

A slow, expensive, forgetful lab cannot afford to re-run experiments to find out what
it meant. The method below is mostly about making each run mean exactly one thing.

---

## 2. Episodes, not sessions

Work is decomposed into **episodes**: one independently verifiable unit with a single
deliverable, a metric chosen *before* building, and an explicit list of what blocks
it. Episodes are grouped into epics (for example, "the path to the first releasable
seed model").

Every episode passes the same eight gates, in order: **design** (hypothesis and
deciding metric) → **offline validation on real failing inputs** → **build** →
**static checks and tests** → **careful deployment** (shadow first) → **live
verification** of the real runtime, not a status badge → **iterate or roll back** →
**record durably**.

## 3. The candidate gate

Before choosing what to do next, every candidate idea is passed through three
questions. It is chosen only if all three are yes:

| gate | question |
|---|---|
| **G1** | Will it produce something that **runs** by the end of the session — not only a document? |
| **G2** | Is its output **measurable and comparable** against a baseline that already exists? |
| **G3** | Is it **falsifiable** — is there a stated result that would prove it wrong? |

Ideas that fail a gate are discarded **in writing**, with the gate they failed. In one
session, ten candidates were considered: one was chosen, two postponed for a stated
dependency, two waited on a decision by the founder, and five were discarded — for
example, "knowledge-conflict tests" failed G2 because no baseline existed yet.

## 4. Pre-registration

A pre-registration is a JSON file written **before any number exists**. It contains:

- **Hypothesis with two failure directions.** `ifWrong` and `ifWrongInAnotherWay` — for
  example, "false positives fall, but genuine refusals disappear too". A hypothesis
  with only one way to fail is being prepared for celebration.
- **The deciding metric and its ground truth.** Ground truth must not come from the
  instrument under test (see §6).
- **Thresholds** for WIN, NOT-WIN and FAIL, each a number.
- **A winnability check** (§5).
- **Anti-tests in both directions** — examples that must trigger and examples that must
  not — written from the form of language, never from the data.
- **A single stopping rule** — minimum sample sizes, computed once.
- **The author's probability forecast** for each verdict, and when available a second
  forecaster's (another model), to be scored with a Brier score after the verdict.
- **What must not be done**, for example "tune the phrase list until it passes".

**Locking.** The proof of locking is a **git commit**, not a file timestamp: editors
rewrite files and reset creation times. Timestamps written inside documents are taken
from the clock, never from memory — a timestamp that drifts later than reality makes a
pre-data amendment look like a post-data one. (In one session the author wrote 17:40
for an amendment made at 17:21, and caught it only because the next command printed
the time.)

**Amendments.** A locked design may still change before data exists, but only under
three conditions: the amendment is **dated**, **committed before the first data file**,
and **strictly makes success harder** — requirements are added conjunctively, so no
amendment can rescue a failure. Suggestions that were *not* adopted are written down
with the reason.

**Verdicts.** The verdict is written **back into the pre-registration file** as
`verdict.result` plus a machine-readable `verdict.state` (`pass | fail | pending |
neutral`) and a date. A status command reads every pre-registration and prints the
current verdicts. When the status command and any prose document disagree, the status
command wins.

## 5. Thresholds that can actually be won

Three rules, each learned by breaking it:

- **A relative threshold larger than its baseline cannot be won (C55).** "Reduce
  over-refusal by at least 15 percentage points" was locked against a baseline of 10.4 %.
  The same mistake was repeated two days later by the person who wrote the law: a
  false-positive threshold of ≤ 2.64 % sat *below* the 3.39 % floor of genuine refusals
  that any correct detector must flag.
- **A threshold must not sit inside the confidence interval of its own reference point
  (C36)**, and must be larger than the instrument's own noise (C35).
- **Granularity is part of the threshold.** With eight control items, one event is
  12.5 points; "≤ 5 %" really means "zero events". Write that down.

When a stricter control would make a threshold unwinnable — for example a cluster-level
significance test with only 16 control rows — it becomes a **mandatory report**, not a
gate, and the file says why.

## 6. Ground truth the scorer never touched

A scorer cannot be audited with its own verdicts. On abstention questions, a row where
the scorer's refusal signal matched is automatically "correct"; auditing that signal
against those verdicts found **zero** errors — the scorer grading itself and always
winning.

Ground truth comes from the **design of the question set** instead. On questions
labelled *factual*, the model is supposed to answer; any abstention signal firing there
is a false positive **by design**, with no human relabelling required. Where design
cannot supply ground truth, a **blinded adjudicator** does — ideally one that did not
design the hypothesis, shown only the question and the final answer.

## 7. One dial per experiment

Every comparison changes exactly one thing. Serving configuration, prompt wrapper,
timeout, transport, and question set are recorded in every result file, and a check
flags any difference between compared runs (C29). When a condition must change — for
example, switching to streaming transport to escape a client timeout — equivalence is
**measured first** with a locked seed, and the measurement's own limits are written
next to it.

## 8. Measure through more than one path

> A measurement made through a single path measures the path as much as it measures
> the model — and it has no way to tell you which.

Disagreement between paths *is* the measurement. The same timeout test run through four
HTTP clients in three languages showed that only one of them imposed a ceiling
(see [03 — Measurement integrity](03-measurement-integrity.md)). Cross-path parity is
planned along six axes: client, answers across clients, operating system, serving
engine, retrieval method, and orchestrator (script vs. tool server vs. human).

## 9. Asking another model to attack the design

External models are consulted as **reviewers of a design**, under a strict rule: they
receive **public information only** — no project names, addresses, private data, or
file contents. The question is always adversarial: *"the three strongest objections;
amendments that only make success harder; which thresholds are unwinnable; your own
forecast."*

In one experiment this caught two confounds the author had missed — that the
comparison could not separate *question type* from *fabrication*, and that noisy labels
could manufacture the association being tested — and both became stricter,
pre-data amendments.

## 10. Guards: rules that run

A rule that exists only as prose is read only when someone happens to read it. The
record is unambiguous: of the author's recurring mistakes, the ones turned into **code
or habit** stopped repeating; the ones left as prose repeated.

So every law gets a **guard in the same commit** — a test that fails when the rule is
broken — and all guards run from one command. Guards exist for, among others:

- verdicts that are readable but stale (a pre-registration claimed 1 of 5 valid rounds
  for five days while the files held 3);
- test files whose tests are never run ("orphan tests");
- credentials in files about to be committed;
- a harness that stores reasoning traces without letting them affect scoring.

A guard's own failure is investigated before the guard is blamed: repeatedly, the first
suspicion — "the guard is broken" — was wrong and the author's test was.

## 11. Records

| record | purpose | rule |
|---|---|---|
| **Living log** | what happened, in order, during a study | written as it happens; timestamps only when provable |
| **Findings log** | numbered findings (F-001…) | what was found, the number, the evidence, what was *not* shown |
| **Experiment ledger** | every experiment, its single dial, result, verdict | negative results recorded as fully as positive |
| **Laws map** | general rules (C1…C59) with the incident that produced each | every law has a guard |
| **Pre-registrations** | the locked design and the verdict | the only place a verdict exists |
| **Changelog** | what changed, dated | semantic versions for tools |
| **Knowledge base + agent memory** | short rules that the next agent reads first | every finding becomes a document, a reusable skill, and a knowledge entry |

**Corrections.** When a published claim turns out to be wrong, a dated correction box
is added and the original text stays. In one case a principle was published, tested by
the same author six hours later, and corrected the same day.

## 12. Operational hygiene that protects measurements

- **Long runs need a heartbeat.** A five-round measurement died silently when the
  controlling laptop was restarted from its Start menu; the log had no line between
  two round ends (2.7 hours), so the death had no time. The cause was found four days
  later only from the operating system's event logs. Runners now write a heartbeat
  every ten minutes and run as detached processes.
- **Identify machines by fingerprint, not address.** A second machine was declared
  "dead" for days while it sat at a new DHCP address. Its identity is now checked by a
  fingerprint of its installed models and server version.
- **Never claim a run is "still going" without checking the process.** The author once
  did; the run had been dead for 21 hours.
- **Credentials never enter files, documents, or chat.**

## 13. Honesty

- **No hype.** If a result is ordinary, the record says it is ordinary.
- **Report what did not happen**, not only what did.
- **Name who made the mistake**, including the AI agents.
- **A verdict is never retracted to make a narrative cleaner** — a failed experiment
  whose own threshold turned out to be unwinnable keeps its verdict, and the defect is
  recorded next to it.
