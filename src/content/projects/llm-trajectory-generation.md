---
title: LLM-Based Zero-Shot Trajectory Generation
shortTitle: Zero-Shot LMTG
period: 2024–2025
status: Prototype validated
summary: A language-to-motion prototype that converts natural-language instructions into collision-aware waypoint trajectories for robotic manipulation.
contribution: I implemented the structured prompting and waypoint-generation pipeline, then connected it to simulation and an early perception-integration prototype.
role:
  - Designed structured task and scene representations for language-model planning.
  - Implemented waypoint parsing, validation, and collision-aware trajectory generation.
  - Evaluated the planning loop in simulation and explored initial perception integration.
teamContribution:
  - Laboratory mentors guided the research scope and reviewed prototype behavior.
  - Shared simulation assets and robot models supported evaluation.
metrics:
  - value: Zero-shot
    label: Planning setting
    note: No task-specific model fine-tuning in the prototype.
  - value: 3 stages
    label: Planning pipeline
    note: Instruction parsing, waypoint generation, and collision checking.
methods:
  - Natural-language task parsing
  - Structured waypoint generation
  - Collision-aware trajectory validation
  - Simulation and early perception integration
limitations:
  - Validation focused on simulation and early perception integration.
  - This project should not be interpreted as complete real-robot validation.
stack: [Python, LLMs, PyBullet, Motion Planning, Prompt Engineering]
media:
  - src: /media/lmtg-system.svg
    alt: Diagram showing a natural-language instruction transformed into waypoint candidates, collision checks, and a simulated robot trajectory.
    caption: The prototype separates language reasoning from geometric validation before execution in simulation.
    kind: diagram
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 4
accent: violet
---
