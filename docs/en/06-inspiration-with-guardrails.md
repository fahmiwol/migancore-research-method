# 06 — Inspiration with guardrails: cognitive science and the Quran Lab

A small lab needs good hypotheses more than it needs more compute. MiganCore draws
hypotheses from two unusual places — the science of human thinking, and the Quran Lab's
engineering readings of scripture — and treats both the same way: **a source of
questions, never evidence for an answer.** Only a pre-registered experiment can support a
result.

---

## 1. The guardrails

From the Quran Lab's own method, adopted unchanged:

1. **Interpretation, not tafsir.** An engineering reading is a layer on top of the sourced
   meaning, never a replacement, and never the single intended meaning of a verse.
2. **Meaning comes from sourced tafsir first**, then reasoning. The Lab grounds each study
   in published tafsir (for Indonesian readers, the Ministry of Religious Affairs' Tafsir
   Kemenag, and Tafsir al-Jalalayn) before writing any analogy.
3. **Science is analogy, not proof** — "structural resonance, not a numerical miracle".
4. **Tanzih:** God's essence and attributes are never cast as a component, role, or
   property of a system. Analogies apply only to creation, human conduct, text, and nature.
5. **Ghaib:** matters of the unseen are read descriptively from sources, never speculated
   about.
6. **No legal rulings** and no claim of religious authority.

MiganCore adds one: **an inspiration is only as good as the experiment it produces.**

## 2. What cognitive science actually supports

Claims about the brain circulate widely. These were checked against primary sources:

| claim | status | source | testable translation for a small model |
|---|---|---|---|
| A bigger brain does not make a smarter person | **Mostly true** — the correlation exists but is weak, r = 0.24 (148 samples, > 8,000 people) | Pietschnig et al., *Neurosci. Biobehav. Rev.* 2015 | Parameters are not the main lever — but beware: small models that beat larger ones did so with enormous data, not with "small clever brains". |
| People are "left-brained" or "right-brained" | **Myth** — lateralisation is local, not a whole-brain trait (1,011 people) | Nielsen et al., *PLoS ONE* 2013 | — |
| Rationality is not the same as intelligence | **Supported** — three failure modes: missing knowledge ("mindware"), failing to detect that an intuitive answer must be overridden, failing to sustain the override | Stanovich (tripartite model; *Thinking & Reasoning* 2018) | Knowledge gaps (S4) vs. **detected-but-not-overridden** doubt (S6), which is testable in reasoning traces |
| Confabulation comes from memory loss | **Incomplete** — spontaneous confabulation is a failure to adapt thought to present reality, tied to orbitofrontal "reality filtering", not to amnesia as such | Schnider, *Nat. Rev. Neurosci.* 2003 | A gate that is allowed to **withhold** an answer. (A specific syndrome, not a universal theory of hallucination.) |
| Hallucination can be over-weighted expectation | **Supported** — conditioned hallucinations in healthy people; voice-hearers more susceptible | Powers, Mathys & Corlett, *Science* 2017 | Knowledge-conflict tests: context that contradicts what the model "expects". |
| Intelligence is one number | **No** — the best-supported psychometric model has broad separable abilities (CHC), now used to define AGI with a "jagged" profile (GPT-4 27 %, GPT-5 57 %) | Hendrycks et al., 2025 | Measure separate axes, never one score. |

**Analogies that mislead when used as specifications:** brain size ≈ parameter count;
tools = nerves; retrieval = hippocampus; reward = dopamine; longer reasoning = a larger
prefrontal cortex. None specifies a mechanism that can be built and tested.

**The sentence that survives:** what distinguishes good reasoners is less capacity than
the ability to **detect when to hold back, and then actually hold back**. For a model
without GPUs, that is good news — an inhibiting layer is far cheaper than capacity.

## 3. An analysis of the Quran Lab, by the MiganCore project

The Lab was read end to end, audited for publication, and compared with MiganCore's
measurements.

**Strengths.**

- An explicit, written method: grounding first, lenses, a rule that a principle needs at
  least two independent studies, versioned revisions that archive old readings, and the
  guardrails above encoded in a validator.
- A coherent body of principles directly relevant to hallucination: *verify before acting*
  (4 studies), *the epistemic ladder* (3), *falsify to trust* (2), *harm-scaled evidence*
  (2).
- Two studies that anticipated a MiganCore result: QS 7:179 and QS 22:46 read failure as
  located in the **evaluator**, not the sensors. When MiganCore first gave its core model
  an image tool, the model still added details the tool had never reported — despite an
  explicit instruction to answer only from the tool's result. A new sensor did not fix the
  evaluator; a later change to the pipeline did.

**Weaknesses found by the audit — stated plainly.**

- **All 168 studies are language-model drafts**, most by sub-agents, although the Lab's own
  method asks authors to write directly. None has a scholarly review, yet all were
  labelled "published".
- **Some grounding summaries copied translation and tafsir text verbatim** — 29 studies had
  runs of twelve words or more. The published provider removes every run of eight or more
  words mechanically and records what was removed.
- **Some readings claim more than the method allows.** One study calls a verse "one
  sentence that solves the problem of hallucination". MiganCore had already built and
  measured exactly that route — retrieval from a knowledge source with an abstention
  gate — and it **failed** its pre-registered criteria (see [07](07-case-studies.md) §3).

**Two readings that changed MiganCore's plan.**

1. **QS 16:43 — the condition at the end of the verse.** *"Ask the people of knowledge,
   **if you do not know**."* The route to knowledge is conditional on the asker knowing
   that they do not know. MiganCore had measured the route and it failed; it had never
   measured the condition. That gap became the H-RAGU experiment.
2. **QS 96:15–16 — the forelock is not the prefrontal cortex in the sourced tafsir.** A
   widely shared claim says modern science "proves" the verse refers to the prefrontal
   cortex. Tafsir Kemenag reads the forelock as the person's pulse of life — the threat is that
   his life will be taken — and the lying and sin as the person's. The claim breaks the Lab's own rule that science is
   analogy, not proof; at most it is a resonance.

**Verses the Lab has not yet studied** that bear directly on MiganCore's questions —
proposed to the Lab's backlog, each as a bounded reading to be written through its method:

| verse | sourced meaning, briefly | bounded engineering reading |
|---|---|---|
| 75:14–15 | a person is a witness against himself, even while offering excuses | knowledge of failure exists inside even when the output rationalises (S6) |
| 27:20–28 | the hoopoe brings clear, convincing news; Solomon still says he will test whether it is true | a convincing report from an agent is verified by an independent test — neither accepted nor dismissed |
| 61:2–3 | saying what one does not do | consistency between stated reasoning and action |
| 2:44 | enjoining good on others while forgetting oneself | an auditor must audit itself |
| 10:39 | rejecting what one has not yet understood, before its explanation came | judging before the context is complete |
| 50:37 and 67:10 | understanding through reason, or through attentive listening | two routes: internal knowledge, or external evidence actually attended to |
| 3:7 | clear and ambiguous verses; the firmly grounded do not force an interpretation | do not force one reading onto ambiguous input |
| 39:18 | listening and following the best of what is said | selecting among candidates requires criteria |

These are candidates, not conclusions. Tanzih and ghaib notes apply where the verses
require them.
