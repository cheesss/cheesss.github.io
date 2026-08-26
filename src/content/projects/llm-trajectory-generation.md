---
title: LLM-Based Zero-Shot Trajectory Generation
shortTitle: Zero-Shot LMTG
period: 2024–2025
status: Prototype validated
summary: A language-to-motion prototype that converts natural-language instructions into collision-aware waypoint trajectories and early real-robot manipulation trials.
contribution: I implemented the structured prompting and waypoint-generation pipeline, then connected simulation, perception, and initial real-robot execution without claiming a complete benchmark.
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
  - This project should not be interpreted as complete real-robot validation.
stack: [Python, LLMs, PyBullet, Motion Planning, Prompt Engineering]
media:
  - src: /media/lmtg-system.svg
    alt: Diagram showing a natural-language instruction transformed into waypoint candidates, collision checks, and a simulated robot trajectory.
    caption: The prototype separates language reasoning from geometric validation before execution in simulation.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lmtg-pick-box.mp4
    poster: /media/posters/lmtg-pick-box.webp
    alt: Real robot moving toward and grasping a red box in a cluttered tabletop scene after a natural-language instruction.
    caption: Early real-robot execution for “Pick up the box,” included as prototype evidence rather than a benchmark result.
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
    caption: Bounding-box failure retained as evidence of the gap between language-level planning and reliable geometric perception.
    kind: video
    section: limitation
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 4
accent: violet
---
