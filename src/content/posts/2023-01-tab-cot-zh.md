---
title: "表格化思维链（Tabular Chain of Thought）"
pubDatetime: 2023-02-17T00:00:00.000Z
description: "发表于 Findings of ACL 2023"
postId: "tab-cot"
lang: "zh"
unlisted: true
tags:
  - publication
  - conferences
---

思维链（Chain-of-Thought, CoT）提示方法之所以能在各类自然语言处理任务上取得成功，是因为它能把模型底层复杂的推理过程显式地展现出来。这些推理过程通常带有一种隐含的结构性。近来也有工作开始探索：如何鼓励模型捕捉到更加*显式*的结构化推理步骤。在这项工作中，我们提出 **Tab-CoT**——一种全新的、以表格形式呈现的 CoT 提示方法，让复杂的推理过程能够以高度结构化的方式被显式建模。方法虽然简单，我们却证明它能够在多个维度上进行推理（即同时沿着行和列展开）。通过在一系列推理任务上的大量实验，我们展示了该方法在零样本和少样本设定下都具备很强的能力。
