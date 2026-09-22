# MiganCore Research Method

**How a one-person lab with no GPU of its own builds and measures an Indonesian-first language model — and how often the measurements, not the model, turned out to be wrong.**

English · [Bahasa Indonesia](README.id.md) · MIT License

---

## What this is

MiganCore is an attempt to own a small language model instead of renting one: an
Indonesian-first model built on an open 4-billion-parameter base (Qwen3-4B,
Apache-2.0), trained with small LoRA runs on rented GPUs and evaluated on a
laptop-class CPU. Its goal is narrow on purpose — **a model that knows when it does
not know, in Indonesian** — because that is where small models fail most visibly
and where frontier benchmarks say the least.

This repository is **not** the model, its weights, or its private data. It is the
**research method** that grew around it between June and September 2026: how
experiments are pre-registered, how verdicts are recorded, how the measuring
instruments are audited, and what went wrong. It is written for researchers and
practitioners in any field who run expensive, slow, noisy experiments with little
money — machine learning, but also medicine, education, social science.

The work is done by one founder, **Fahmi Ghani**, with AI agents (Anthropic's Claude
and OpenAI's Codex) acting as research staff. Where an agent made a mistake, the
record says so.

## The one thing to take away

> **Measure the instrument before you believe the measurement.**

Across four months, the most consequential errors were not in the model. They were in
the harness around it: an HTTP client that silently hung up after 300 seconds and made
eleven measurements of the base model invalid; a keyword scorer that read the
Indonesian word *masalah* ("problem") as a refusal because it contains *salah*
("wrong"); a comparison of two detectors whose "143× gap" was really a difference in
base rates; a guard whose verdict depended on which `tar` binary came first on the
PATH; and an evaluation harness that had thrown away every reasoning trace the model
ever produced. Each one produced numbers that looked plausible.

## The method in twelve lines

1. **Pre-register before numbers exist** — hypothesis, metric, thresholds, stopping
   rule, and your own probability forecast; lock it with a commit.
2. **Write two ways to be wrong** for every hypothesis, not one.
3. **Use ground truth the scorer never touched.**
4. **Check that every threshold is winnable** before locking it.
5. **One dial per experiment.** Never mix configurations inside one comparison.
6. **Gate candidates:** runnable, measurable against an existing baseline, falsifiable.
   Discard the rest in writing.
7. **Ask another model to attack the design** — with public information only — and
   accept only amendments that make success harder.
8. **Control the confounds you can name:** subpopulation, noisy labels, output length,
   repeated items.
9. **Write the verdict back into the pre-registration file**, in a field a program can
   read. A verdict stored anywhere else does not exist.
10. **Every recorded law gets a test in the same commit.** Rules kept only as prose are
    the ones that repeat.
11. **Record everything as it happens** — living log with provable timestamps, numbered
    findings, experiment ledger, changelog.
12. **No hype.** Negative results are written as fully as positive ones; corrections
    go in dated boxes and the original text stays.

## Read

| | English | Bahasa Indonesia |
|---|---|---|
| The ecosystem: MiganCore, SIDIX, Quran Lab, OMIGA | [docs/en/01-ecosystem.md](docs/en/01-ecosystem.md) | [docs/id/01-ekosistem.md](docs/id/01-ekosistem.md) |
| The research method | [docs/en/02-method.md](docs/en/02-method.md) | [docs/id/02-metode.md](docs/id/02-metode.md) |
| Measurement integrity | [docs/en/03-measurement-integrity.md](docs/en/03-measurement-integrity.md) | [docs/id/03-integritas-pengukuran.md](docs/id/03-integritas-pengukuran.md) |
| The laws (C22, C30–C61) | [docs/en/04-laws.md](docs/en/04-laws.md) | [docs/id/04-hukum.md](docs/id/04-hukum.md) |
| Hallucination: a taxonomy and a live experiment | [docs/en/05-hallucination.md](docs/en/05-hallucination.md) | [docs/id/05-halusinasi.md](docs/id/05-halusinasi.md) |
| Inspiration with guardrails: cognitive science and the Quran Lab | [docs/en/06-inspiration-with-guardrails.md](docs/en/06-inspiration-with-guardrails.md) | [docs/id/06-ilham-berpagar.md](docs/id/06-ilham-berpagar.md) |
| Case studies, with numbers | [docs/en/07-case-studies.md](docs/en/07-case-studies.md) | [docs/id/07-studi-kasus.md](docs/id/07-studi-kasus.md) |
| Limitations | [docs/en/08-limitations.md](docs/en/08-limitations.md) | [docs/id/08-keterbatasan.md](docs/id/08-keterbatasan.md) |
| Templates | [templates/](templates/) | [templates/](templates/) |

## Status

*Last updated 23 September 2026. Every number below is reproducible from a
pre-registration file and a raw result file in the private working repository; the
verdicts are applied mechanically, not chosen.*

- **The base-model anchor (A3) is finished: 5 of 5 valid rounds** — 53.6 %, 64.3 %,
  46.4 %, 57.1 %, 60.7 % fabrication on questions that require abstention (mean
  **56.42 %**, 95 % CI 47.88–64.96). Over-refusal was **0 % in all five**: the base
  model does not refuse, it fabricates.
- **The seed condition it was meant to feed turned out to be unfalsifiable.** The
  mechanical threshold admitted five of five measured models, so the condition was
  declared **undefined** for seven days rather than quietly relaxed, and replaced by a
  pre-registered two-tier rule.
- **The abstention gate passed a threshold locked before the data.** Eight alternating
  pairs of rounds: fabrication **52.2 % → 33.9 %**, mean difference **18.31 points**
  (95 % CI 6.59–30.03), gated over-refusal 1.6 %, factual accuracy *rose*. Forecast
  Brier score 0.335 against 0.667 for a uniform guess.
- **…and the same experiment refuted its own design assumption.** Pairing *increased*
  variance, because the gate's benefit scales with how much fabrication there is to
  remove (r = +0.942). Below ~45 % baseline the gate does nothing. This became
  [C61](docs/en/04-laws.md), and it means "improve the model" and "install the gate"
  draw on the same budget rather than stacking.
- **Two questions that had been conflated are now separated by name.** Do the *weights*
  qualify (plain rounds only)? `migancore:0.14` — **no**, 49.99 %. Does the *served
  system* qualify (any winning configuration)? `0.14` + gate — **yes**, 33.92 %.
  Quoting one as the other is a false claim, not a simplification.
- **An uncomfortable result, stated because it is ours.** The project's oldest model —
  its first generation — is the only one whose weights meet the stricter tier
  (24.55 %). On the honesty axis, four further months of training moved the served
  model backwards. The claim does not extend to other axes, which have no thresholds yet.
- A pre-registered experiment on reasoning traces (H-RAGU) returned **inconclusive**:
  the model does write its uncertainty when fabricating (0.94), but it writes it on
  correct factual answers almost as often (0.89, p = 0.52). The gate built on that
  signal was closed. This is [C60](docs/en/04-laws.md).
- The currently served model is `migancore:0.14`, with the gate in shadow mode. Two
  later candidates were refused promotion by their own gates.

## Tools

- [`tools/prepublish-scan.mjs`](tools/prepublish-scan.mjs) — run before making any
  directory public. It finds credentials, email addresses, IP and MAC addresses, server
  paths and personal Windows paths, and **never prints a matched value** (only
  `file:line:kind`). No dependencies. On its first run it caught its own author: a test
  fixture contained a real machine's MAC address. Identifiers you *want* public (such as
  a contact email) go in [`.prepublish-allow`](.prepublish-allow) as
  `public <kind> <value>`, each with a reason.
- The Quran Lab provider — [`fahmiwol/sidix/providers/quran-lab`](https://github.com/fahmiwol/sidix/tree/main/providers/quran-lab).

## What is deliberately not here

Model weights, private datasets, infrastructure details, and anything licensed by a
third party. Quranic text, translations and tafsir belong to their publishers and are
never reproduced here; the Quran Lab publishes only its own interpretive work.

## Contact and collaboration

**Fahmi Ghani** — fahmiwol@gmail.com · GitHub [@fahmiwol](https://github.com/fahmiwol)

Collaboration, replication attempts, criticism of the method, and review of the Quran Lab
studies by qualified scholars are all welcome. So are reports of anything in this
repository that turns out to be wrong.

## License and citation

MIT — see [LICENSE](LICENSE). If you use the method, cite it with
[CITATION.cff](CITATION.cff).
