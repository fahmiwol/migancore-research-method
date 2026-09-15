# 01 — The ecosystem: SIDIX, the Quran Lab, OMIGA and MiganCore

MiganCore did not start from nothing. It is the fourth of four connected experiments by
the same founder, each of which left something the next one uses. This chapter describes
what each one is, what flows between them, and where the connections are claims rather
than measurements.

---

## The four projects

| project | what it is | public? |
|---|---|---|
| **SIDIX** | An open-source AI agent platform (Python). About ninety registered agent tools, an MCP interface, and a family of modules that turn concepts from Islamic scholarship into engineering mechanisms: *sanad* (ranking and chaining sources), *tabayyun* (verification before use), *naskh* (resolving conflicting knowledge), *maqashid* (value-based filtering), and *hafidz* (a provenance ledger). | [github.com/fahmiwol/sidix](https://github.com/fahmiwol/sidix) |
| **Quran Lab** (Lab Tadabbur) | A set of 168 studies that read Quranic verses as **structural analogies for engineering and AI design**, with 33 cross-study principles, 16 lenses, and an explicit interpretive method. Interpretation, not tafsir; drafted with language models; not yet reviewed by scholars. | the app is public; the Lab is being published as a clean SIDIX provider |
| **OMIGA** | A personal knowledge brain: an MCP server that indexes the founder's repositories, working sessions, documents and skills, and gives every AI agent the same memory — who the founder is, how he works, what has already been tried, and what was learned. | private (personal data) |
| **MiganCore** | The attempt to own a small Indonesian-first language model, and the measurement discipline that grew around it. | method public (this repository); model and data private |

## What flows between them

```
                 ┌──────────────────────────────┐
                 │ OMIGA — shared memory for    │
                 │ every agent on every project │
                 └──────┬──────────▲────────────┘
          context,      │          │  findings, lessons,
          working rules │          │  failed attempts
        ┌───────────────┼──────────┼─────────────────┐
        ▼               ▼          │                 ▼
 ┌────────────┐   ┌────────────┐   │          ┌─────────────┐
 │   SIDIX    │   │ Quran Lab  │───┼─────────▶│  MiganCore  │
 │ sanad,     │   │ principles │ design       │ model +     │
 │ tabayyun,  │──▶│ as design  │ hypotheses   │ measurement │
 │ hafidz     │   │ hypotheses │   │          │ discipline  │
 └─────▲──────┘   └─────┬──────┘   │          └──────┬──────┘
       │   provider     │          │                 │
       └────────────────┘          └─────────────────┘
```

- **SIDIX → MiganCore: provenance as engineering.** SIDIX first turned *sanad* and
  *tabayyun* into code. MiganCore reuses the idea for its models: every trained model has a
  provenance chain (base, data, training run, evaluation), and the status command reports
  whether each link is intact or weak.
- **Quran Lab → MiganCore: hypotheses, never evidence.** Lab principles such as
  *verify before acting*, *the ladder from conjecture to certainty*, and *failure lives in
  the evaluator, not the sensors* shaped MiganCore's gates and its order of work
  (evaluation before new modalities). The clearest case is the condition at the end of
  QS 16:43 — "ask those who know, **if you do not know**" — which became a
  pre-registered experiment (see [06](06-inspiration-with-guardrails.md) and
  [05](05-hallucination.md)).
- **Quran Lab → SIDIX: a provider.** The Lab's own interpretive work is published as a
  SIDIX provider, so SIDIX agents can cite a study as an *interpretation-tier* source,
  with its disclaimer attached.
- **OMIGA ↔ everything: memory.** Agents read the founder's working rules and prior
  attempts from OMIGA before starting, and write findings back when they finish — so a
  mistake made on one project is not rediscovered on another. The rule that every finding
  becomes a document, a skill and a knowledge entry lives there.

## A short timeline

| period | step |
|---|---|
| April–May 2026 | SIDIX: open-source agent platform; Islamic-method engineering modules |
| June 2026 | MiganCore: the decision to own a model; the first own 4B model served |
| July 2026 | Quran Lab: studies and principles written in waves |
| July–August 2026 | OMIGA: the shared memory layer and the "book" of working rules |
| August–September 2026 | MiganCore: pre-registration, laws, instrument audits; this public method |

## What is claimed, and what is measured

- **Measured:** the defects in [03](03-measurement-integrity.md), the case studies in
  [07](07-case-studies.md), and every verdict stated with a number.
- **Designed, not yet measured:** that SIDIX-style provenance improves model lineage
  decisions; that Lab-inspired gates reduce fabrication. Each is an open hypothesis.
- **Not claimed:** that scripture proves any engineering result, or that any project here
  is a religious authority.
