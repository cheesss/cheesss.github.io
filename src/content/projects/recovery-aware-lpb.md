---
title: Recovery-Aware LPB for RMP-Induced OOD States
shortTitle: Recovery-Aware LPB
period: "2026"
status: Manuscript in preparation
summary: A policy bridge that detects states created by reactive safety interventions and returns the robot to task-relevant behavior.
contribution: I designed the recovery bridge and evaluated it in 160 RB10 trials. Task success increased from 64.4% with the original LPB to 91.3% under the same intervention setting.
role:
  - Designed the recovery-state definition and recovery-aware policy bridge.
  - Built the RB10 and ROS 2 evaluation pipeline for intervention and recovery trials.
  - Analyzed failure modes across baseline, fine-tuning, original LPB, and the proposed method.
teamContribution:
  - The broader team developed and maintained the robot platform, task setup, and safety procedures.
  - Research mentors and I refined the experimental protocol and manuscript framing.
metrics:
  - value: 91.3%
    label: Recovery-aware LPB
    note: 146 successes across 160 evaluation trials.
  - value: 64.4%
    label: Original LPB
    note: Evaluated under the same intervention setting.
  - value: 63.8%
    label: Fine-tuning
    note: Direct adaptation baseline.
  - value: 25.0%
    label: Base policy
    note: No recovery-specific adaptation.
methods:
  - Proximity-triggered RMP intervention
  - OOD state identification
  - Recovery-aware policy bridge
  - Real-robot rollout evaluation
limitations:
  - Results are specific to the evaluated task distribution and intervention protocol.
  - The manuscript and broader task-suite evaluation are still in preparation.
stack: [Python, PyTorch, ROS 2, RB10, RMP, Imitation Learning]
media:
  - src: /media/lpb-system.svg
    alt: Diagram showing a task policy, RMP safety intervention, OOD state, and recovery-aware policy bridge returning control to the task policy.
    caption: The RMP safety layer can move the robot outside the demonstration distribution. The recovery bridge returns control from those states to task execution.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lpb-hero.mp4
    poster: /media/posters/lpb-hero.webp
    alt: RB10 manipulator moving above a tabletop cup during an intervention-and-recovery experiment without any people in frame.
    caption: RB10 intervention-and-recovery excerpt from the real-robot evaluation.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lpb-inference-excerpt.mp4
    poster: /media/posters/lpb-inference-excerpt.webp
    alt: An RB10 manipulator performs an LPB inference run while Hyeonjun Cho adjusts the workpiece on the adjacent table.
    caption: Excerpt from a continuous RB10 LPB inference session, including manual workpiece repositioning between rollouts.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lpb-recovery-a.mp4
    poster: /media/posters/lpb-recovery-a.webp
    alt: LPB diagnostic timeline showing live camera observations, nearest-neighbor guidance, measured paths, and the recovery cost crossing its threshold.
    caption: Representative guided recovery trace with synchronized observations, trajectory views, and the LPB cost timeline.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 597 / 548
  - src: /media/videos/lpb-recovery-b.mp4
    poster: /media/posters/lpb-recovery-b.webp
    alt: Second LPB diagnostic timeline showing a distinct recovery trajectory and the recovery cost falling below the decision threshold.
    caption: A second trial shows the recovery cost falling below the decision threshold as the robot returns toward task execution.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 597 / 548
links: []
featured: true
order: 1
accent: teal
---
