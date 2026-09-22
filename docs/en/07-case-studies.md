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
nobody had chosen (C56). After the fix: **five valid rounds** of 36 questions, zero
network errors in each — **53.6 %, 64.3 %, 46.4 %, 57.1 % and 60.7 %** fabrication
(mean **56.42 %**, standard deviation 6.88, 95 % confidence interval **47.88–64.96**).
Over-refusal was **0 % in all five**: the base model does not refuse, it fabricates.

**Predictions written before rounds 2–5, scored after:** fabrication between 45 % and
60 % — *correct on the mean*, though **two of five rounds fell outside the range**;
over-refusal stays near zero — *correct*. Both halves are stated deliberately. A
prediction that holds on the average while missing 40 % of individual rounds is weaker
than it looks, and rounding it up to "correct" would hide exactly that.

**What the anchor then broke.** Applied to the existing release condition, the mechanical
threshold (fabrication ≤ 65 %) admitted **five of five** measured models — including one
already barred from promotion by a different gate. A threshold that nothing can fail is
not a threshold. The seed condition was therefore declared **undefined** rather than
quietly relaxed, and it stayed undefined for seven days until a replacement was
pre-registered and installed. The gap was recorded in public, not papered over.

**The uncomfortable part.** Under the replacement rule, the project's **oldest** model —
its first generation — is the only one whose *weights* meet the stricter tier: **24.55 %**
fabrication. The currently served model, after four further months of training, sits at
**49.99 %**. This is not circular: the replacement threshold is derived from the untrained
base, not from either model. It supports one narrow, verifiable claim — **on the honesty
axis, four months of training moved the model backwards** — and does not extend to the
other axes (tool use, language, local reasoning), which have no thresholds yet.

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

## 9. A gate that worked — and a paired design that backfired

**Situation.** An abstention gate runs a small probe model over the question first; if the
question is unanswerable, the answering model is instructed to abstain. Earlier single
measurements suggested a large improvement, but single runs mislead (C5), and the gate had
never been judged against a threshold locked in advance.

**Design.** Eight *pairs* of rounds on the served model, 36 questions each. Within every
pair, one plain arm and one gated arm; the order was **alternated between pairs** so that
machine drift would cancel. Thresholds locked before any data: adopt only if the mean
difference ≥ 12.0 points **and** the lower bound of its 95 % confidence interval > 5.0
points **and** gated over-refusal ≤ 10 % **and** factual accuracy does not drop by more
than 5 points. Forecast recorded: 0.55 adopt / 0.35 insufficient / 0.10 reject.

**Result.** Fabrication **52.2 % → 33.9 %**; mean difference **18.31 points** (95 % CI
**6.59–30.03**); gated over-refusal **1.6 %**; factual accuracy **rose** (40.6 → 42.9 %).
All four conditions met — verdict **adopt**, applied mechanically. Brier score of the
forecast: **0.335** against 0.667 for a uniform guess. The direction was right and the
confidence was too low.

**The part that was not predicted.** The paired design **failed at its own purpose**. The
standard deviation of the differences was **14.02** against a pooled per-arm deviation of
**7.56** — pairing *increased* variance. The cause was not noise: within a pair the two
arms are **negatively** correlated (r = −0.728), and the reason is visible in a second
correlation that is almost perfect and monotonic — plain fabrication against the gate's
benefit, **r = +0.942**:

| plain | gated | difference |
|---|---|---|
| 39.3 % | 39.3 % | **0.0** |
| 44.4 % | 46.4 % | **−2.0** |
| 44.4 % | 35.7 % | +8.7 |
| 55.6 % | 32.1 % | +23.5 |
| 57.1 % | 28.6 % | +28.5 |
| 59.3 % | 25.0 % | **+34.3** |
| 60.7 % | 35.7 % | +25.0 |

Below roughly 45 % baseline fabrication the gate does nothing — twice it did slight harm.
Above roughly 55 % it removes 23–34 points. **A gate is not an honesty adder; it is a
filter, and its yield depends on how much there is to filter.**

**Why this changes how the number may be quoted.** "The gate reduces fabrication by 18.3
points" is a wrong sentence. The correct one is "18.3 points **on a model that fabricates
52 %**." An older measurement that had never been connected fits the same shape: on the
first-generation model (24.55 % plain, 8 rounds), the same gate measured 15.5 % (3
rounds) — about **9.1** points, roughly half the effect at half the baseline. *That
second figure is weaker evidence and is labelled as such:* it is unpaired, from different
days, with three rounds against eight. It is consistent with the law; it does not
establish it. The paired experiment does.

The consequence is unwelcome and is stated rather than buried: **"improve the model" and
"install the gate" draw on the same budget.** They do not stack, and any plan that adds
them as separate gains is counting twice.

**A note on verdicts.** The locked rule was applied unchanged; the variance finding does
not alter the verdict, only the range over which the number may be generalised. Deploying
the gate to production remained a human decision — a mechanical verdict is permission,
not an action.
