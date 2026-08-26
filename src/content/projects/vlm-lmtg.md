---
title: VLM-Grounded, Memory- and Gripper-Aware LMTG
shortTitle: VLM-Grounded LMTG
period: "2025"
status: Prototype validated
summary: A language-model trajectory pipeline augmented with visual scene grounding, execution memory, and gripper-aware grasp selection for tabletop manipulation.
contribution: I integrated visual grounding and task memory into the trajectory-generation loop, then evaluated the resulting system across a fixed 15-scenario protocol.
role:
  - Built the scene-grounding interface between visual observations and language-conditioned planning.
  - Added memory and gripper-aware grasp selection to reduce repeated execution failures.
  - Designed and ran a 15-scenario evaluation comparing the initial and improved systems.
teamContribution:
  - Research framing and experiment review were developed with laboratory mentors.
  - The work reused shared simulation and manipulation infrastructure.
metrics:
  - value: 12/15
    label: Improved system
    note: Successes in the defined 15-scenario evaluation.
  - value: 9/15
    label: Initial system
    note: Baseline before memory and gripper-aware improvements.
  - value: "+3"
    label: Additional successes
    note: Improvement within this evaluation protocol.
methods:
  - Visual scene grounding
  - Grasp candidate selection
  - Execution-memory update
  - Language-conditioned trajectory generation
limitations:
  - The reported improvement is limited to the defined 15 scenarios.
  - Generalization to cluttered, unseen real-world scenes requires further evaluation.
stack: [Python, Vision-Language Models, LLMs, PyBullet, Manipulation Planning]
media:
  - src: /media/vlm-system.svg
    alt: Diagram of an RGB scene being grounded into objects, a gripper-aware grasp being selected, and execution feedback updating task memory.
    caption: Perception, grasp selection, and execution feedback are kept in one loop so the planner can revise decisions after failure.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/vlm-yellow-bottle.mp4
    poster: /media/posters/vlm-yellow-bottle.webp
    alt: Real robot selecting and executing a grasp for a yellow bottle among several tabletop objects.
    caption: Real-robot result for the prompt “Pick up the yellow bottle,” demonstrating gripper-aware object selection and execution.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/vlm-red-box-suction.mp4
    poster: /media/posters/vlm-red-box-suction.webp
    alt: Real robot using a suction end effector to approach and lift a red rectangular box from a tabletop scene.
    caption: A second end-effector condition tests whether the planner can ground the red box and execute a suction grasp.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/vlm-zero-shot-failure.mp4
    poster: /media/posters/vlm-zero-shot-failure.webp
    alt: Real robot approaching tabletop objects during a zero-shot trial that does not complete the intended grasp reliably.
    caption: Limitation case retained to show why scene grounding alone does not guarantee robust zero-shot execution.
    kind: video
    section: limitation
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 3
accent: orange
---
