---
title: RAGTAL / DNA-HERO
shortTitle: RAGTAL / DNA-HERO
period: "2025"
status: Completed
summary: An RB10 imitation-learning system trained from force-feedback teleoperation data and tested through repeated real-robot rollouts.
contribution: As Learning Lead, I built the demonstration-to-rollout workflow, curated the training data, and ran 50 real-robot rollouts per evaluated model.
role:
  - Led learning-system integration from teleoperation demonstrations to policy rollout.
  - Collected and curated real-robot demonstrations and ran 50 rollouts per evaluated model.
  - Diagnosed failure cases and coordinated model iteration with the hardware team.
teamContribution:
  - Team members designed and assembled the force-feedback teleoperation hardware and supporting electronics.
  - Hardware, control, learning, and presentation work were integrated across the full DNA-HERO team.
metrics:
  - value: 9/10
    label: Integrated final trials
    note: Successful demonstrations during the final presentation setting.
  - value: "50"
    label: Rollouts per model
    note: Real-robot evaluation runs used for model comparison.
  - value: Grand Prize
    label: DNA Capstone Design
    note: Awarded for the integrated team project.
methods:
  - Force-feedback teleoperation
  - Demonstration collection
  - Imitation-learning policy training
  - RB10 rollout evaluation
limitations:
  - The 9/10 result reflects the final-presentation condition, not a broad benchmark.
  - The hardware team designed and fabricated the teleoperation system.
stack: [Python, PyTorch, ROS 2, RB10, Teleoperation, Imitation Learning]
media:
  - src: /media/ragtal-system.svg
    alt: Diagram showing force-feedback teleoperation demonstrations flowing into dataset curation, policy learning, and RB10 robot rollout evaluation.
    caption: I led the learning loop. The team built and integrated the teleoperation hardware, controls, and robot platform.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/ragtal-teleoperation.mp4
    poster: /media/posters/ragtal-teleoperation.webp
    alt: A custom leader arm is moved by hand while an RB10 robot mirrors the motion across three real manipulation setups.
    caption: Leader-arm teleoperation used to collect demonstrations for three task configurations.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/ragtal-rollouts.mp4
    poster: /media/posters/ragtal-rollouts.webp
    alt: An RB10 robot executes three learned manipulation tasks involving flat parts, a yellow bin, and a black workpiece.
    caption: Representative real-robot rollouts from the three final-presentation task families. The reported 9/10 result is limited to that integrated presentation setting.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 2
accent: blue
---
