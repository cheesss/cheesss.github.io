---
title: VLM-Grounded, Memory- and Gripper-Aware LMTG
shortTitle: VLM-Grounded LMTG
period: "2025"
status: Evaluated on 15 scenarios
summary: A tabletop manipulation planner that combines visual grounding, execution memory, and gripper-aware grasp selection.
contribution: I connected visual grounding and execution memory to the planner, then evaluated the system on a fixed set of 15 scenarios. Success increased from 9/15 to 12/15.
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
  - The 15-scenario evaluation did not include cluttered or previously unseen real-world scenes.
stack: [Python, Vision-Language Models, LLMs, PyBullet, Manipulation Planning]
media:
  - src: /media/vlm-system.svg
    alt: Diagram of an RGB scene being grounded into objects, a gripper-aware grasp being selected, and execution feedback updating task memory.
    caption: The planner uses grounded objects and gripper constraints, then stores execution feedback for the next attempt.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/vlm-yellow-bottle.mp4
    poster: /media/posters/vlm-yellow-bottle.webp
    alt: Real robot selecting and executing a grasp for a yellow bottle among several tabletop objects.
    caption: Real-robot trial for the prompt “Pick up the yellow bottle.”
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
    alt: Real robot approaching tabletop objects during a zero-shot trial that does not complete the intended grasp.
    caption: Zero-shot trial in which the robot approaches the target but fails to complete the grasp.
    kind: video
    section: limitation
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 3
accent: orange
---
