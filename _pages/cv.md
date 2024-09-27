---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
<!-- * Ph.D in Version Control Theory, GitHub University, 2018 (expected)
* M.S. in Jekyll, GitHub University, 2014 -->
* B.S. in Singapore Univeristy of Technology and Design, 2022

Work experience
======
* Fall 2022 to Fall 2024: Research Assistant 
  * Singapore Univeristy of Technology and Design
  * Research Topics: Reasoning (Math, Unification).
  * Supervisor: Lu Wei

* Spring 2024 to Fall 2024: Associate Member
  * SEA AI Lab
  * Research Topics: Post-training (DPO, SFT-data, Evaluation).
  * Supervisor: Liu Qian and Dou Longxu
  
Skills
======
* Coding Frameworks for Research Purpose.
* Academic Writing.

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Manager for StatNLP Lab webpages, servers and weekly meetings (until Fall 2024).
