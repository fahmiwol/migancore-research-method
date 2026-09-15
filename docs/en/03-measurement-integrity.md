# 03 — Measurement integrity: auditing the instrument first

> **A measurement made through a single path measures the path as much as it measures
> the model — and it has no way to tell you which.**

This chapter collects the defects found in MiganCore's own evaluation harness. Three of
the first four had already produced wrong conclusions that sat in project documents for
weeks. None is exotic. All survived review because the numbers they produced looked
plausible. The **direction** of the errors matters: most of them flattered the project.

---

## 1. The timeout that was not ours (C56)

**Symptom.** Eleven attempts to measure the raw base model failed. The conclusion
written at the time was that the base model "reasons too long to be measured".

**Cause.** Node's built-in `fetch` (undici) has a default **headers timeout of
300,000 ms**. With `stream: false`, the model server sends nothing until the whole
answer is generated, so any answer that needs more than 300 seconds severs its own
connection — regardless of the timeout the harness sets. The error message is the
generic `fetch failed`; the real cause is only visible in the error's `cause` chain
(`UND_ERR_HEADERS_TIMEOUT`).

**How it was confirmed.** A mock server accepts a connection and stays silent for
305 seconds. Four clients with default settings, run concurrently:

| client | result | seconds |
|---|---|---|
| Node `fetch` | **gave up** | **304.86** |
| curl | completed | 305.08 |
| Python urllib | completed | 305.29 |
| Python requests | completed | 305.49 |

Predictions for all four were written down before the first run; all four held. The
test needs no GPU, no network and no real model, and takes about five minutes. It would
have saved three weeks.

**Fix.** Streaming transport, after its equivalence was measured with a locked seed on
a model whose sampling is deterministic under that seed (3 of 3 byte-identical). The
first equivalence test nearly blamed streaming for changing answers; the test design was
wrong (it could not separate transport from model non-determinism), and a precondition
was added: the same mode must reproduce itself before two modes are compared.

**The lesson is not "Node is wrong."** Waiting forever is not better. The lesson is that
a limit should be **chosen and written down**, not inherited silently.

## 2. Two empty answers are always identical

An equivalence check reported "identical" for two answers that were both **empty**: the
token budget had been consumed entirely inside the model's reasoning block. Every
equivalence test now requires the compared outputs to be non-empty. A comparison over
nothing always passes (C33, C50).

## 3. A scorer that was too generous (and in two directions)

**Symptom.** "Our model refuses factual questions 16 % of the time."

**Cause.** The refusal signal of the regex scorer contained bare content words without
word boundaries. *Masalah* ("problem") contains *salah* ("wrong"); *salah satu* ("one
of") contains it too. A model explaining Indonesian morphology — *salah → menyalahkan* —
was scored as declining to answer. 274 of 1,381 refusal matches depended on these words;
113 of them were unambiguous false positives.

**Effect of fixing only the mechanical part:**

| model | fabrication | | over-refusal | |
|---|---|---|---|---|
| a stock 7B model | 34.1 → **45.1** | +11.0 | 4.2 → 0.0 | −4.2 |
| our first-generation model | 24.6 → 25.0 | +0.4 | 16.1 → **6.5** | **−9.7** |

One defect, two directions: fabrication was under-reported on abstention questions and
refusal over-reported on factual ones — which is exactly why it never looked like a
single bias. No published verdict was overturned; two claims became stronger.

## 4. Signals, base rates, and a published number that did not survive (C57)

An audit of four scorer signals on 827 factual questions (where abstaining is wrong by
design) produced a striking table: the "refuses" signal fired falsely 14.3 % of the
time, the "corrects the premise" signal 0.1 % — **a 143× gap** — and a design principle
was published: *signals that look for ACTIONS survive; signals that look for TOPICS
collapse.*

Six hours later the author tested the principle by building a scorer from action phrases
only. It did not meet its threshold — and diagnosing why revealed that the 143× gap was
invalid. Premise correction almost never happens on factual questions: the premise is
true, by design. Its base rate was near zero. **A raw error rate mixes how badly a
signal misfires with how often the behaviour it detects occurs at all.**

Controlling for base rate — of the rows where each signal fires, what fraction show the
act genuinely happening:

| signal | fires | genuine | precision |
|---|---|---|---|
| "refuses" (keyword) | 118 | 27 | 23 % |
| action-phrase scorer | 50 | 28 | **56 %** |
| "asks back" | 55 | 14 | 25 % |
| "it depends" | 39 | 0 | **0 %** |
| "corrects premise" | 1 | 1 | 100 % (n = 1, not evidence) |

The principle survived on precision (2.4× better while catching *more* genuine refusals);
the headline number did not. Both documents were corrected the same day with dated
boxes; the original text was kept.

## 5. A verdict that depended on the shell (C58)

A guard that inventories trained adapters passed 11 of 11 checks from Git Bash and
failed 2 from PowerShell, on the same repository. Two stacked defects sat behind one
`catch { return null; }`:

1. Windows' built-in `tar` (bsdtar) rejects GNU tar's `--force-local` option, so every
   call failed and was swallowed as "no adapter".
2. After that was fixed, it still failed: bsdtar prints file lists with **CRLF** line
   endings, so every name carried a trailing `\r` and `endsWith('adapter_config.json')`
   was always false. 29 adapters read as zero.

The second defect could not be seen until the first was fixed. **When a correct fix
does not restore the result, read the swallowed error before concluding the fix was
wrong.**

## 6. A channel that was thrown away (C59)

A hypothesis came up: when the model fabricates, does its reasoning trace already say it
does not know? A census of 110 result files (3,789 answers, 11 models) found that **zero
rows stored the reasoning trace**. The harness took only the final answer. A direct probe
showed the trace was present in 40 of 41 streamed chunks — thousands of tokens per
question, about 250 seconds of CPU each — and discarded in every measurement ever made.

The harness now stores the trace in a separate field; the request and the scoring are
unchanged, and a test proves a trace full of refusal phrases cannot change a verdict.
The hypothesis was pre-registered **before the first trace existed** (see
[05 — Hallucination](05-hallucination.md)).

## 7. Verdicts that were readable but stale

A status tool reads every pre-registration's verdict. It was correct — and useless for
five days, during which a measurement had three valid rounds while its verdict said one.
A guard now compares the count claimed in the verdict with the count computed from the
result files, and fails until the verdict is updated. It was validated on the real
stale verdict from the old commit, not on a made-up string.

## 8. A checklist

Before trusting a number:

- [ ] Which timeouts exist on the path — including the ones you did not set?
- [ ] Is the error you see the error that happened, or a wrapper around it?
- [ ] Are compared outputs non-empty?
- [ ] Does the scorer's vocabulary contain words that occur in correct answers?
- [ ] Is ground truth independent of the scorer?
- [ ] Does the comparison control for the base rate of the behaviour?
- [ ] Does the result change when measured through a second path (another client,
      shell, OS, engine)?
- [ ] What does every measurement produce and then throw away?
- [ ] Is the recorded verdict consistent with the files on disk?
