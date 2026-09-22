# 04 — The laws

MiganCore records general rules as numbered **laws**. Each law was produced by a concrete
incident, and each has — or is supposed to have — a guard that fails when the law is
broken. Earlier laws (C1–C21, C23–C29) concern training dials and are kept in a different
format in the private log; the ones below are the laws about measurement, evaluation and
process. Titles are translated from Indonesian.

| law | statement |
|---|---|
| **C22** | A ratio must be computed over one set: the numerator must be a subset of the denominator. |
| **C30** | A keyword-based checker systematically under-counts correct behaviour. |
| **C31** | Two guards that are each correct can cancel each other's data. |
| **C32** | A fixed test set does not automatically exaggerate — it exaggerates the models that memorise it. |
| **C33** | A gate that does not check the network response returns the *worst* score, not an error. |
| **C34** | Strict decoding buys consistency, not honesty. |
| **C35** | A threshold that cannot be separated from its own instrument noise is not a gate but a lottery. |
| **C35b** | Tool-use training raises fabrication *and* widens its variance. |
| **C36** | A threshold must not sit inside the confidence interval of its own reference point. |
| **C37** | A two-tier gate must state which tier the promotion rule reads. |
| **C38** | Thresholds outlive the instruments that measured them, and nobody notices. A change of dictionary requires a bridge: rescore everything with old and new. |
| **C39** | An objective that does not apply returns the *best* value, indistinguishable from perfection. |
| **C40** | Searching for a fix with grep finds the comment that promises it, not the code that does it. |
| **C41** | "Cannot be asked" is not "dead" — and a single reading must not kill anything. |
| **C42** | The *correct* curriculum dials lead straight to test-set contamination unless something stops them. |
| **C43** | An instrument that scores by word patterns gets worse exactly when the model gets better. |
| **C44** | A trait trained under a system prompt lives only under that system prompt. |
| **C45** | When instructions are routed by a probe, a 4B model obeys firm prohibitions almost fully and soft guidance hardly at all. |
| **C46** | An embedding probe recognises internal entities but rejects general facts; the smallest training class determines its cost. |
| **C47** | A pre-registration condition that is not coded into the verdict function does not bite. |
| **C48** | Giving tools to a 4B model made its reasoning worse, not better. |
| **C49** | Honesty and tool ability traded off against each other within one model family. |
| **C50** | A measurement can pass every validity check and still measure nothing. |
| **C51** | Uniform training data passes every check that counts quantity; diversity must be counted separately. |
| **C52** | Data files whose names do not match the scanner's pattern are never gated — and a missing gate makes no sound. |
| **C53** | A parameter rejected by a provider costs one full run to discover, unless every call is journaled. |
| **C54** | A retrieval corpus that indexes our own working transcripts contains the answer key to our test set. |
| **C55** | A relative threshold larger than its baseline cannot be won. |
| **C56** | The timeout we set is not the only timeout. |
| **C57** | Raw error rates cannot compare the quality of two detectors; control for base rate. |
| **C58** | One catch-all error handler hides stacked defects; fixing the first is the only way to reveal the second. |
| **C59** | Data that is not stored is a hypothesis that can never be tested. |
| **C60** | A signal that fires on correct answers as often as on wrong ones is not a signal; it is a style. |
| **C61** | The benefit of an abstention gate scales with the baseline fabrication rate; "the gate's effect" is not a constant. |

## Patterns across the laws

- **Silence looks like success.** C33, C39, C50, C52 and C58 are the same failure in
  different clothes: a missing, empty or swallowed result is read as a good one.
- **The instrument ages differently from the model.** C38, C43 and C57: the thing that
  measures improvement can decay precisely because the model improved.
- **Rules without code repeat.** C47 and C55 were both broken by people who knew them.
  The response was not a better-written rule but a guard.
- **Small models are not small large models.** C44, C45, C48 and C49 describe behaviour
  of a 4B model that does not extrapolate from frontier models.
