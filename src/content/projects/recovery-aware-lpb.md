---
title: Recovery-Aware LPB for RMP-Induced OOD States
shortTitle: Recovery-Aware LPB
period: "2026"
status: Manuscript in preparation
summary: A recovery-aware imitation-learning pipeline that detects unsafe distribution shifts induced by reactive motion policies and returns the robot to task-relevant states.
contribution: I designed and evaluated a recovery-aware policy bridge that improves real-robot task success under proximity-triggered RMP interventions.
role:
  - Designed the recovery-state definition and recovery-aware policy bridge.
  - Built the RB10 and ROS 2 evaluation pipeline for intervention and recovery trials.
  - Analyzed failure modes across baseline, fine-tuning, original LPB, and the proposed method.
teamContribution:
  - The broader team developed and maintained the robot platform, task setup, and safety procedures.
  - Experimental protocols and manuscript framing were refined collaboratively with research mentors.
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
    caption: The safety layer can create states unseen in demonstrations; the recovery bridge explicitly reconnects those states to task execution.
    kind: diagram
    autoplay: false
    aspectRatio: 16 / 9
links: []
featured: true
order: 1
accent: teal
---
