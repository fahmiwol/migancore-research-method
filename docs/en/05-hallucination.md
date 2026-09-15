# 05 — Hallucination: a taxonomy, and an experiment still waiting for its data

## 1. The starting hypothesis — and why it was not enough

The founder's working theory (September 2026) was that a model hallucinates for one of
three reasons: it **fails to understand the context**, it **fails to use its tools**
("the nerves are not wired to the right place"), or its **reasoning is faulty**.

All three are real and supported by evidence. But the project's own measurements did not
fit inside them. On a public set of Indonesian questions that require a non-answer
behaviour, the raw base model (three valid rounds) fabricated on:

| question type | fabricated | covered by the three-cause theory? |
|---|---|---|
| false premise | 10 / 15 = **66.7 %** | only partly — the model follows the user's framing |
| underspecified intent | 10 / 15 = 66.7 % | yes — context |
| subjective | 8 / 12 = 66.7 % | partly — reasoning |
| unanswerable (fictional entity) | 11 / 18 = **61.1 %** | **no** — there is nothing to understand, look up, or reason towards |
| missing context | 4 / 12 = 33.3 % | yes — context |
| time-sensitive | 3 / 12 = 25.0 % | yes — tools |

Unanswerable questions need no context, no tool and no chain of reasoning: the fact does
not exist. The mapping from question type to cause is a judgement, sample sizes are small
(12–24 per type), and labels come from an imperfect scorer — so this table is descriptive,
not causal. It was enough to show the theory was incomplete.

An external reviewer model, asked the same question with public information only,
independently called the three causes *"useful debugging headings but a weak causal
taxonomy"*, and listed the nerve analogy among analogies that are misleading **as a
specification**: it does not say *when* the nerve should fire.

## 2. A taxonomy with seven entries

| | cause | observable signature | cheapest intervention | evidence |
|---|---|---|---|---|
| **S0** | **the instrument** — the number is wrong, not the model | the rate changes when the scorer or path changes | audit the measurement first | [03](03-measurement-integrity.md) |
| **S1** | context not understood, or never delivered | correct when the full context is supplied | check the context path; context-aware decoding | Liu et al., *Lost in the Middle*, TACL 2024 |
| **S2** | tool/route failure — not called, wrong tool, result ignored | a relevant tool was available and unused | a router triggered by a "don't know" signal | Mallen et al., 2023 (adaptive retrieval) |
| **S3** | faulty reasoning that snowballs | an early wrong step later defended | executable steps; sample consistency | Zhang et al., ICML 2024 |
| **S4** | **knowledge absent, and an incentive to guess** | fabrication about plausible-sounding entities | calibrated abstention; facts in retrieval, not weights | Kalai et al., 2025; Anthropic, 2025; Gekhman et al., EMNLP 2024 |
| **S5** | **premise or user pressure** | accepting a false premise | premise detection and correction | Sharma et al., ICLR 2024 |
| **S6** | **knows, but does not act** | doubt written in the reasoning, confident final answer | a gate that reads the reasoning — no training | Zhang et al., 2024; Young, 2026 |

Evidence in one line each:

- **Kalai, Nachum, Vempala & Zhang (2025).** Under binary grading, guessing always beats
  saying "I don't know" in expectation; facts seen once in training bound the hallucination
  rate from below. The project's evaluation already scores abstention as correct and
  guessing as wrong — aligned with the paper's proposed remedy.
- **Anthropic, *On the Biology of a Large Language Model* (2025).** A default "can't
  answer" circuit is inhibited by "known entity" features; hallucinations occur when
  familiarity misfires without the underlying knowledge. Indonesian place and
  institution names that *sound* plausible are an ideal trigger.
- **Gekhman et al. (EMNLP 2024).** Fine-tuning examples that introduce new knowledge are
  learned slowly and, once learned, linearly increase hallucination — which supports
  keeping facts in retrieval and behaviour in weights.
- **Zhang et al. (ICML 2024).** Models over-commit to early mistakes; separately asked,
  ChatGPT and GPT-4 recognise 67 % and 87 % of their own wrong claims. The knowledge of the
  error exists; it is not used while answering.
- **Young (2026).** Across 12 open-weight reasoning models, in 55.4 % of cases where a
  model followed a misleading hint, the hint was acknowledged only in the reasoning, not in
  the answer.
- **Chen et al. (2025).** Reasoning models verbalise hints they actually used only 25 %
  (Claude 3.7 Sonnet) and 39 % (DeepSeek R1) of the time — so the absence of doubt in a
  trace does not show the absence of doubt in the model.

## 3. The experiment: does the model write down its doubt and fabricate anyway? (H-RAGU)

**Why it matters for a lab without GPUs.** If S6 is common, a gate that reads the reasoning
trace and turns written doubt into an abstention would reduce fabrication **with no
training at all**. If it is rare, the fix must target the knowledge boundary (retrieval or
training), which costs money.

**Why it had never been tested.** The harness had discarded every reasoning trace (C59).
Traces are now stored, and the next two rounds of the base-model anchor measurement
capture them at no extra compute cost.

**Design, locked before the first trace existed:**

- **Population.** Base model, default reasoning mode, valid plain rounds of the public
  36-question set, rows with a stored trace.
- **Detector.** The union of three phrase families applied to the trace only —
  knowledge absence (*"I'm not sure"*, *"I don't recall"*, *"might not exist"*, *"my
  knowledge cutoff"*), premise doubt (*"the user seems to assume"*, *"that's not
  correct"*), missing information (*"the user didn't specify"*, *"it's ambiguous
  which"*). Only phrases with a subject or copula; bare hedges (*maybe*, *wait*, *I
  think*) are excluded because correct reasoning is full of them. Traces are mostly
  English even for Indonesian questions.
- **Why the union.** A real gate does not know the question type; using the matching
  family per type would be cheating with the test set's labels.
- **Metrics.** DETECTION = share of fabricated answers whose trace fires. FALSE ALARM =
  share of correct factual answers whose trace fires.
- **Thresholds.** VIABLE if DETECTION ≥ 0.30 and FALSE ALARM ≤ 0.15. FAILED if DETECTION <
  0.10 or FALSE ALARM ≥ DETECTION. Otherwise INCONCLUSIVE.
- **Stopping rule.** At least 15 fabricated rows and 8 correct factual rows with traces;
  computed once.
- **Anti-tests.** 13 sentences that must fire, 17 that must stay silent, and a
  behavioural check that no pattern fires on a single content word. Four coverage holes
  were found with synthetic sentences — not data — and patched before the lock.
- **Winnability.** DETECTION can reach 1.0. FALSE ALARM's floor is genuine doubt in
  correct factual answers, unknowable before data; with about ten controls, 0.15 means at
  most one alarm. If it fails, the rows must be read to separate detector noise from
  genuine doubt, and the threshold declared unwinnable if needed — without changing the
  verdict.

**First amendment (before data, after an external model's critique):**

- VIABLE also requires a permutation test (10,000 permutations, fixed seed) with p < 0.05,
  and the detector must beat a **length-only** rule at the same false-alarm rate.
- Interpretation narrowed: FAILED does not show the model lacks internal uncertainty
  (reasoning traces are unfaithful — Chen et al.); VIABLE does not show faithful
  introspection.
- Not adopted: a learned TF-IDF classifier with train/test split — too few rows; recorded
  as future work.

**Second amendment (before data, after a second critique):** the reviewer found two
confounds that could manufacture a positive result.

- **Question type.** Fabricated rows come from abstention questions; false alarms from
  factual questions. A detector that only recognises "this question calls for caution"
  could win. VIABLE now also requires a **stratified** test among abstention questions only —
  labels shuffled within each question type — showing the detector fires more on
  fabrications than on correctly handled answers. A synthetic detector that tracks only
  question type (80 % vs 20 % pooled) gets p = 1 on this test.
- **Noisy labels.** A genuine abstention missed by the regex scorer becomes "fabricated"
  while its trace naturally contains doubt. VIABLE must now pass on the scorer's labels
  **and** on labels from a **blinded adjudicator** — another model shown only the question
  and the final answer, never the trace, the detector output or the scorer's label — using
  a rubric frozen in the pre-registration.
- All permutation p-values use the Monte Carlo correction (b + 1)/(N + 1).
- Cluster-level analysis (the same questions repeat across rounds) and a paired test
  against the length rule are **mandatory reports, not gates**: with at most 16 factual
  controls, making them gates would create an unwinnable threshold.
- Every addition is conjunctive. No amendment can turn a failure into a success.

**Forecasts, recorded before data:**

| forecaster | VIABLE | INCONCLUSIVE | FAILED |
|---|---|---|---|
| the author (Claude, before amendments) | 0.25 | 0.40 | 0.35 |
| the external reviewer (Codex, before the second amendment) | 0.20 | 0.55 | 0.25 |

Both will be scored against the verdict.

**Status: waiting for data.** The verdict will be published here whatever it is.
