---
title: "自和谐思维链（Self-Harmonized Chain of Thought）"
pubDatetime: 2024-02-17T00:00:00.000Z
description: "发表于 NAACL 2025（主会）"
postId: "self-harmonized-cot"
lang: "zh"
unlisted: true
tags:
  - publication
  - conferences
---

思维链（CoT）提示揭示了大语言模型能够通过中间步骤完成复杂推理。CoT 提示大致可分为三类。第一类使用像“Let's think step by step”这样直白的提示，让模型先生成一段顺序的思考过程再给出答案。第二类依靠人工编写的分步示范来引导模型的推理。第三类则用“Let's think step by step”自动生成带推理的示范，但这种做法有时会引入推理错误，说明我们需要让示范更加多样，以削弱其误导效应；然而，多样的示范又给有效的表示带来了挑战。在这项工作中，我们提出 **ECHO**，一种自和谐的思维链提示方法：它把多条不同的解题路径归并成一种统一而有效的解题模式。在三个推理领域上，ECHO 都取得了最好的整体表现。
