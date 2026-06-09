---
title: "How Much Do Diffusion LLMs Memorize? (vs Autoregressive)"
pubDatetime: 2026-06-09T00:00:00Z
featured: false
draft: false
tags:
  - research
  - diffusion-llm
  - memorization
description: "A small experiment comparing the memorization capacity of a masked-diffusion LM and a same-size autoregressive LM on random bitstrings."
---

A quick share of a small experiment I ran, inspired by Morris et al.'s
[*"How much do language models memorize?"*](https://arxiv.org/abs/2505.24832) (which estimates GPT-style
models store ~3.6 bits/parameter). The question: **how does a masked-diffusion LM (LLaDA-style) compare
to a same-size autoregressive (AR) model in raw memorization capacity?**

## Setup (kept deliberately simple)

- **Data:** uniform **random bitstrings** (length 64). No structure → every bit the model retains is pure
  memorization. Memorized bits = `H(x) − H(x|θ)`.
- **Models:** one shared ~201k-param transformer, used two ways — AR (causal) and diffusion (bidirectional,
  trained with the LLaDA masked objective). Same params → directly comparable.
- **How `H(x|θ)` is measured:** AR uses its **exact NLL**; diffusion uses **pseudo-log-likelihood (PLL)** —
  mask one token, predict it from the other 63. (Using the diffusion ELBO instead drastically *under*-counts
  memorization, for a reason that turns out to be the punchline below.)
- **Capacity** = the peak total bits memorized as we grow the dataset size N, with each model trained to
  saturation.

![AR vs Diffusion memorization](/assets/images/ar_vs_diffusion_memorization.png)

## What happened

| N (dataset) | AR — bits (steps to saturate) | Diffusion — bits (steps) |
|------|-------------------------------|--------------------------|
| 256  | 14.3k (134k) | 16.4k (262k) ✅ |
| 1024 | 55.3k (91k)  | 65.3k (614k) ✅ |
| 2048 | —            | 127.5k (1.26M) ✅ |
| 4096 | 210k (200k)  | ~66k (2M, **still climbing**) ❌ |
| 16384| **267k** (169k) | — |

- **AR capacity ≈ 267k bits ≈ 1.33 bits/param** — a clean curve: memorization rises with N, peaks, then
  falls. AR is **capacity-limited**.
- **Diffusion fully memorizes up to N=2048 (127.5k bits)**, then hits a wall: at N=4096 it reached only
  ~25–50% even after **2 million** training steps, and was *still improving*. Diffusion is
  **optimization-limited**, not capacity-limited.

## Three takeaways

**1. Capacity looks similar — diffusion even stores *more* per sample where it converges.**
At matched N, diffusion ≥ AR (e.g. N=1024: 65.3k vs 55.3k bits).

**2. ...but that "more" is a metric artifact, not extra capacity.** The gap is *exactly* the
**`log₂N` prefix cost**. An AR model must spend ~`log₂N` bits per sequence just to figure out *which* of the
N sequences it's looking at, decoding left-to-right — and indeed AR's per-sample loss lands on `log₂N`
almost exactly (8.09 bits at N=256, 10.04 at N=1024, 12.69 at N=4096). Diffusion's PLL reveals 63 of 64
tokens, so the sequence is always identifiable and that cost ≈ 0. Different measurement ceiling
(`L − log₂N` vs `L`), not different memory.

**3. The real difference is trainability.** Steps to fully memorize grew
**262k → 614k → 1.26M → (wall)** — roughly doubling each time N doubled, then failing entirely beyond
N≈4096. AR reaches its ceiling in ~100–200k steps throughout. Memorizing random data through the masked
(any-order) objective is *dramatically harder to optimize*, even though the storage ceiling is comparable.

## One line

**AR and diffusion have similar memorization *capacity*; diffusion is just much harder to *train* to it.**
AR's wall is capacity; the diffusion model's wall is optimization steps. (Caveat: diffusion's number is a
lower bound — N=4096 never finished saturating within 2M steps — so its true capacity is likely higher,
plausibly on par with AR.) With enough training steps, diffusion can also *memorize* everything within its capacity limit without generalisation *as much*.
