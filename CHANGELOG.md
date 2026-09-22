# Changelog

All notable changes to this repository. Versions follow semantic versioning.

## [1.1.0] — 2026-09-23

### Added

- **Law C60** — a signal that fires on correct answers as often as on wrong ones is not a
  signal; it is a style. From a pre-registered experiment on reasoning traces that returned
  **inconclusive** and closed the gate built on it.
- **Law C61** — the benefit of an abstention gate scales with the baseline fabrication rate;
  "the gate's effect" is not a constant. Derived from the case study below.
- **Case study 9 (EN and ID)** — an abstention gate judged against a threshold locked before
  the data (fabrication 52.2 % → 33.9 %, mean difference 18.31 points, 95 % CI 6.59–30.03,
  forecast Brier 0.335), and the same experiment refuting its own design assumption: the
  paired design *increased* variance because the two arms are negatively correlated within a
  pair (r = −0.728), which in turn is explained by an almost perfect relationship between
  baseline fabrication and the gate's benefit (r = +0.942).

### Corrected

- The **Status** section of both READMEs and case study 1 reported the base-model anchor as
  *3 of 5 valid rounds, mean 54.8 %*. It has been finished for a week: **5 of 5 rounds, mean
  56.42 %** (95 % CI 47.88–64.96), over-refusal 0 % in all five. The stale figure is named
  here rather than silently replaced, because a public number that lags the working record is
  the failure this repository is about.
- Case study 1 now scores its own pre-registered prediction honestly: the range 45–60 % held
  *on the mean* but **two of five rounds fell outside it**. The earlier text reported only the
  favourable half.

### Changed

- The Status sections now separate two questions that had been conflated in this project's own
  writing: whether the model's **weights** meet the seed condition (they do not — 49.99 %) and
  whether the **served system** does (it does — 33.92 % with the gate). Quoting one as the
  other is a false claim, not a simplification.
- Added the result that follows from that separation and is unflattering: the project's
  **oldest** model is the only one whose weights meet the stricter tier (24.55 %). On the
  honesty axis, four further months of training moved the served model backwards. The claim is
  bounded to that axis; the others have no thresholds yet.

## [1.0.1] — 2026-09-16

### Corrected

- Chapter 01 (EN and ID) said *every* trained MiganCore model carries a provenance chain.
  Counted against the repository, six do. Three of those chains were intact and three had
  weak links when checked in September 2026. The chapter now says exactly that.

### Added

- A collaboration contact in both READMEs and `CITATION.cff`.
- `tools/prepublish-scan.mjs` accepts `public <kind> <value>` entries in `.prepublish-allow`
  for identifiers that are published on purpose.

## [1.0.0] — 2026-09-16

First public release.

- The research method, measurement-integrity record, law catalogue (C22, C30–C59),
  hallucination taxonomy with a live pre-registered experiment, inspiration-with-guardrails
  chapter (cognitive science and the Quran Lab), case studies and limitations — in English
  and Bahasa Indonesia.
- Templates: pre-registration (JSON), living log, finding entry, candidate gate, law entry.
- MIT License.

### Pending

- The verdict of the H-RAGU experiment (reasoning traces vs. fabrication), to be added
  whatever it is.
- The fourth and fifth rounds of the base-model anchor measurement.
