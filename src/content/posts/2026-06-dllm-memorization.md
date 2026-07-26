---
title: "How Much Do Diffusion LLMs Memorize? (vs Autoregressive)"
pubDatetime: 2026-06-09T00:00:00Z
featured: false
draft: false
tags:
  - research
  - diffusion-llm
  - memorization
description: "Same size, same memory ceiling — but the diffusion model needs ~10x the training to reach it, and eventually just can't."
---

**TL;DR — I gave an autoregressive LLM and a masked-diffusion LLM of the *exact same size* the same
impossible task: memorize pure random noise. They top out at roughly the same capacity. The twist: the
diffusion model needs ~10x more steps to get there, and past a certain dataset size it hits a wall it
never climbs. Diffusion isn't memory-limited — it's *optimization*-limited.**

I ran this after reading Morris et al.'s [*"How much do language models memorize?"*](https://arxiv.org/abs/2505.24832)
(GPT-style models store ~3.6 bits/param). Natural follow-up: does a LLaDA-style diffusion LM store more,
less, or the same?

## The setup (one paragraph)

Feed the model **random 64-bit strings**. There's no structure to learn, so every bit it reproduces is
pure memorization — memorized bits = `H(x) − H(x|θ)`. One shared **~201k-param** transformer, trained two
ways: **AR** (causal, exact NLL) and **diffusion** (bidirectional, LLaDA masked objective, scored by
pseudo-log-likelihood — mask one token, predict it from the other 63). Grow the dataset `N`, train each to
saturation, read off the peak bits stored. Same params, so it's apples to apples.

![AR vs Diffusion memorization](/assets/images/ar_vs_diffusion_memorization.png)

## What actually happened

| N (dataset) | AR — bits (steps to saturate) | Diffusion — bits (steps) |
|------|-------------------------------|--------------------------|
| 256  | 14.3k (134k) | 16.4k (262k) ✅ |
| 1024 | 55.3k (91k)  | 65.3k (614k) ✅ |
| 2048 | —            | 127.5k (1.26M) ✅ |
| 4096 | 210k (200k)  | ~66k (2M, **still climbing**) ❌ |
| 16384| **267k** (169k) | — |

AR draws a clean curve — memorization climbs with `N`, peaks at **~267k bits (1.33 bits/param)**, then
falls. It's **capacity-limited**: it fills up and stops. Diffusion memorizes *everything* up to N=2048,
then face-plants: at N=4096 it clawed to ~25–50% after **2 million** steps and was *still improving* when I
pulled the plug.

## Why "diffusion stores more" is a lie your metric tells you

At matched `N`, diffusion looks like it stores *more* (65.3k vs 55.3k at N=1024). It doesn't. The gap is
**exactly the `log₂N` prefix tax**: an AR model burns ~`log₂N` bits per sequence just identifying *which*
of the N strings it's decoding, left to right — and sure enough its per-sample loss lands almost dead on
`log₂N` (8.09 bits at N=256, 10.04 at N=1024, 12.69 at N=4096). Diffusion's PLL hands it 63 of 64 tokens,
so the string is never in doubt and that tax is ~0. Different measuring stick (`L − log₂N` vs `L`), *same
memory*.

## The real difference is trainability

Steps to fully memorize: **262k → 614k → 1.26M → wall.** Roughly doubling every time `N` doubled, then
failing outright past N≈4096. AR hits its ceiling in ~100–200k steps the whole way. Memorizing noise
through an any-order masked objective is just *brutally* harder to optimize — even when the shelf space is
the same.

## One line

**AR and diffusion have similar memorization capacity; diffusion is just far harder to *train* into it.**
AR's wall is space. Diffusion's wall is steps — and its number here is a *lower* bound (N=4096 never
finished), so its true capacity is probably right there next to AR's. The upshot: give a diffusion model
enough steps and it *will* memorize everything it can fit — it just generalizes less along the way.
