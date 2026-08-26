---
title: LLM-Based Zero-Shot Trajectory Generation
shortTitle: Zero-Shot LMTG
period: 2024–2025
status: Prototype · early robot trials
summary: A language-to-motion prototype that converts instructions into waypoint trajectories and checks them for collisions before execution.
contribution: I implemented the task representation, waypoint parser, and collision checks, then connected the planner to simulation and initial real-robot trials.
role:
  - Designed structured task and scene representations for language-model planning.
  - Implemented waypoint parsing, validation, and collision-aware trajectory generation.
  - Evaluated the planning loop in simulation and explored initial perception and real-robot execution integration.
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
  - Simulation and early real-robot integration
limitations:
  - Real-robot clips are prototype demonstrations rather than a controlled quantitative benchmark.
  - The project has not been evaluated in a controlled real-robot benchmark.
stack: [Python, LLMs, PyBullet, Motion Planning, Prompt Engineering]
media:
  - src: /media/lmtg-system.svg
    alt: Diagram showing a natural-language instruction transformed into waypoint candidates, collision checks, and a simulated robot trajectory.
    caption: The prototype separates language reasoning from geometric validation before execution in simulation.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 30 / 13
  - src: /media/videos/lmtg-pick-box.mp4
    poster: /media/posters/lmtg-pick-box.webp
    alt: Real robot moving toward and grasping a red box in a cluttered tabletop scene after a natural-language instruction.
    caption: Early real-robot trial for the instruction “Pick up the box.”
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lmtg-simulation-planning.mp4
    poster: /media/posters/lmtg-simulation-planning.webp
    alt: A desktop simulation shows a robot rotating its gripper, approaching a narrow box, and executing generated waypoint motions while planning logs update alongside it.
    caption: Simulation trace of the language-generated approach, gripper reorientation, and waypoint execution used before the early real-robot trials.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lmtg-red-box-placement.mp4
    poster: /media/posters/lmtg-red-box-placement.webp
    alt: Real robot lifting a red box and moving it toward a larger open brown box on the tabletop.
    caption: Early placement trial for “Put the red box in the brown box,” connecting language-generated waypoints to physical execution.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 283 / 180
  - src: /media/videos/lmtg-bbox-failure.mp4
    poster: /media/posters/lmtg-bbox-failure.webp
    alt: Real robot approaching a red box beside an open brown box during a trial affected by inaccurate bounding-box geometry.
    caption: An inaccurate object bounding box produces an invalid approach near the brown box.
    kind: video
    section: limitation
    autoplay: false
    aspectRatio: 16 / 9
links:
  - label: Trajectory-generation research fork
    href: https://github.com/cheesss/language-models-trajectory-generators
featured: true
order: 4
accent: violet
---
