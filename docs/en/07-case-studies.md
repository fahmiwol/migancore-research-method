# 07 — Case studies, with numbers

Short accounts of experiments that changed the project's direction. Negative results are
the majority, and they are the most useful.

---

## 1. An anchor that passed by construction

**Situation.** The release condition for the first seed model read: *fabrication ≤ the
upper 95 % confidence bound of the base.* But the "base" in the formula was the project's
own first-generation model, so that model passed **by construction** — which proves
nothing.

**Change.** The anchor was replaced with the raw, untrained base model, measured with the
same plain wrapper. The first eleven attempts were invalid because of a client timeout
nobody had chosen (C56). After the fix: three valid rounds of 36 questions, zero network
errors each — **53.6 %, 64.3 % and 46.4 %** fabrication (mean 54.8 %, standard deviation
9.0 points). Five rounds are required; the threshold will not be derived before then.

**Predictions written before rounds 2–5:** fabrication between 45 % and 60 % (the mean
holds; one round lies outside); over-refusal stays near zero (holds, 0 % in all three).
If the anchor holds near 55 %, the existing release condition — tuned on a much lower
anchor — was standing on the wrong number.

## 2. Testing our own published claim — the same day

**Situation.** A principle had just been published: *scorer signals built from action
phrases survive; those built from topic words collapse.*

**Experiment.** Build a scorer from action phrases only. Thresholds locked beforehand:
false-positive rate ≤ 2.64 % on factual questions and recall of genuine refusals ≥ 90 %.

**Result.** False positives fell from 14.27 % to **6.05 %**; recall **89.46 %**. Verdict:
**NOT WIN.** Not deployed.

**What mattered more than the verdict.** (1) The win threshold was **unwinnable**: genuine
refusals on factual questions — which any correct scorer must flag — were 3.39 %, above
the 2.64 % threshold. (2) The published "143× gap" behind the principle was a base-rate
artefact (C57). On precision the principle survived (56 % vs 23 %). The threshold was not
moved and the verdict was not retracted; the defects were recorded next to it.

## 3. Retrieval that failed for the wrong reason

**Hypothesis.** Retrieval-augmented answering with an abstention gate reduces fabrication
without a large rise in over-refusal.

**Result.** **Failed** on both the clean arm and the placebo arm — over-refusal rose
**16.7 points**, beyond the locked budget.

**Diagnosis.** The method was not the main problem; the **source** was. Of eight factual
questions, the answer existed in the original sources for **one**. Worse, the retrieval
corpus indexed the project's own working transcripts, which took **67 %** of retrievals —
and those transcripts contained the test set's answers (C54). A retrieval corpus built from
your own notes is an answer key.

## 4. Honesty training that did not reduce fabrication

**Hypothesis.** A small set of gold honesty examples (33 rows) lowers fabrication on the
abstention set.

**Result.** Fabrication **60.0 %** against a win threshold of ≤ 50 %. **Rejected**, not
deployed. A related lesson recorded as law: tool-use training raised fabrication and widened
its variance (C35b), and giving tools to the 4B model made its reasoning worse (C48).

## 5. Two candidates refused by their own gates

- A tool-trained candidate **failed the regression gate** and was not promoted.
- An honesty-trained candidate **passed** the regression gate but **did not win** its
  honesty criterion, and was archived.

The model in service stayed the same. Refusing promotion is the gate working, not failing.

## 6. Reinforcement learning with rewards that could not teach

A multi-objective GRPO run used five reward components. Diagnostics showed **three of the
five had zero variance** within groups — they supplied no learning signal at all. Six such
runs were trained and paid for; their adapters were never evaluated until an inventory
guard made them visible. Lesson: check reward variance before paying for a run, and never
let trained artefacts go unharvested.

## 7. A machine that was "dead" for days

A second machine used for measurement was repeatedly declared dead. It was running the
whole time, at a new DHCP address. Remote desktop failed, and the machine was apparently
power-cycled by hand because of it. The fix was to identify machines by a fingerprint of
their installed models and server version — and to read the operating system's event
logs, which showed exactly when each machine had actually been off.

## 8. Asking a stronger model the same question

External frontier models were used twice as reviewers of an experimental design, always
with public information only. Both times they found real problems — confounds, unwinnable
controls, an interpretation that claimed too much — and both times the fixes were adopted
**before** data existed. One suggestion was rejected with a written reason (too few rows
for a learned classifier). A reviewer is most valuable before the data, when changing the
design is still honest.
