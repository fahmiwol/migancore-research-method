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
| The laws (C22, C30–C59) | [docs/en/04-laws.md](docs/en/04-laws.md) | [docs/id/04-hukum.md](docs/id/04-hukum.md) |
| Hallucination: a taxonomy and a live experiment | [docs/en/05-hallucination.md](docs/en/05-hallucination.md) | [docs/id/05-halusinasi.md](docs/id/05-halusinasi.md) |
| Inspiration with guardrails: cognitive science and the Quran Lab | [docs/en/06-inspiration-with-guardrails.md](docs/en/06-inspiration-with-guardrails.md) | [docs/id/06-ilham-berpagar.md](docs/id/06-ilham-berpagar.md) |
| Case studies, with numbers | [docs/en/07-case-studies.md](docs/en/07-case-studies.md) | [docs/id/07-studi-kasus.md](docs/id/07-studi-kasus.md) |
| Limitations | [docs/en/08-limitations.md](docs/en/08-limitations.md) | [docs/id/08-keterbatasan.md](docs/id/08-keterbatasan.md) |
| Templates | [templates/](templates/) | [templates/](templates/) |

## Status

- The base-model anchor measurement (A3) has 3 of 5 valid rounds: 53.6 %, 64.3 % and
  46.4 % fabrication on questions that require abstention (mean 54.8 %). Rounds 4–5
  are running.
- A pre-registered experiment on reasoning traces (H-RAGU) is locked and waiting for
  data. Its verdict will be added here whether it succeeds or fails.
- The currently served model is `migancore:0.14`. Two later candidates were refused
  promotion by their own gates.

## Tools

- [`tools/prepublish-scan.mjs`](tools/prepublish-scan.mjs) — run before making any
  directory public. It finds credentials, email addresses, IP and MAC addresses, server
  paths and personal Windows paths, and **never prints a matched value** (only
  `file:line:kind`). No dependencies. On its first run it caught its own author: a test
  fixture contained a real machine's MAC address.
- The Quran Lab provider — [`fahmiwol/sidix/providers/quran-lab`](https://github.com/fahmiwol/sidix/tree/main/providers/quran-lab).

## What is deliberately not here

Model weights, private datasets, infrastructure details, and anything licensed by a
third party. Quranic text, translations and tafsir belong to their publishers and are
never reproduced here; the Quran Lab publishes only its own interpretive work.

## License and citation

MIT — see [LICENSE](LICENSE). If you use the method, cite it with
[CITATION.cff](CITATION.cff).
