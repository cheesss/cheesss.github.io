---
title: Recovery-Aware LPB for RMP-Induced OOD States
shortTitle: Recovery-Aware LPB
period: "2026"
status: Manuscript in preparation
summary: A policy bridge that detects states created by reactive safety interventions and returns the robot to task-relevant behavior.
contribution: I designed the recovery bridge and evaluated the proposed method in 160 RB10 trials. It completed 146 trials (91.3%); the original LPB reached 64.4% under the same intervention setting.
problem: >-
  Reactive safety layers such as RMPflow keep a manipulator away from obstacles, but the avoidance motion can leave the robot in states that never appeared in the demonstrations. A diffusion policy queried from such a state has no reliable reference to return to, so a single safe intervention can turn into a task failure. The question was whether a latent-guidance method, Latent Policy Barrier (LPB), could be made aware of these avoidance-induced states without retraining the base policy.
approach: >-
  I reimplemented Latent Policy Barrier and augmented its latent-dynamics model with post-avoidance recovery transitions collected from real RMP interventions, keeping the base diffusion policy fixed. The framework combines diffusion-policy references, RMPflow reactive avoidance triggered by proximity signals, and LPB latent guidance that steers the robot back toward the demonstration distribution. An RB10 / ROS 2 pipeline synchronizes policy references, RMP-modified executions, dual-camera observations, proximity signals, and LPB internal states for every trial.
findings: >-
  Across eight real-robot OOD start configurations, the recovery-aware bridge succeeded in 146 of 160 trials (91.3%). Under the same intervention setting, the recorded comparison rates were 64.4% for original LPB, 63.8% for policy fine-tuning on the same recovery demonstrations, and 25.0% for the base policy. Baseline trial counts are not stated because their denominators are not confirmed in the available records.
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
    note: 146 successes in 160 trials of the proposed method across eight OOD start configurations.
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
  - src: /media/videos/lpb-hero.mp4
    poster: /media/posters/lpb-hero.webp
    alt: An RB10 manipulator moves above a tabletop cup during an intervention-and-recovery experiment.
    caption: A short representative rollout from the real-robot intervention-and-recovery evaluation.
    kind: video
    section: intro
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/lpb-system.svg
    alt: Diagram showing a task policy, RMP safety intervention, OOD state, and recovery-aware policy bridge returning control to the task policy.
    caption: The RMP safety layer can move the robot outside the demonstration distribution. The recovery bridge returns control from those states to task execution.
    kind: diagram
    section: method
    autoplay: false
    aspectRatio: 2 / 1
  - src: /media/videos/lpb-rmp-inference-intro.mp4
    poster: /media/posters/lpb-rmp-inference-intro.webp
    alt: An RB10 manipulator runs an RMP-guided LPB inference trial while a privacy-masked operator introduces a white-board obstacle.
    caption: RMPflow deflects the RB10 around an introduced obstacle before LPB-guided task execution resumes. The 55-second excerpt masks every visible third-party face.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/lpb-inference-excerpt.mp4
    poster: /media/posters/lpb-inference-excerpt.webp
    alt: An RB10 manipulator performs an LPB inference run while Hyeonjun Cho adjusts the workpiece on the adjacent table.
    caption: Short excerpt from the continuous RB10 LPB inference session, including workpiece repositioning between repeated rollouts.
    kind: video
    section: additional
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
    section: additional
    autoplay: false
    aspectRatio: 597 / 548
  - src: /media/videos/lpb-inference-full.mp4
    poster: /media/posters/lpb-inference-full.webp
    alt: Hyeonjun Cho monitors and resets workpieces beside an RB10 manipulator during a continuous LPB inference session.
    caption: Continuous real-robot LPB inference session across repeated rollouts (3 min 27 s at 1.7× speed). Hyeonjun Cho's face is shown with permission; one third-party face is masked.
    kind: video
    section: additional
    autoplay: false
    aspectRatio: 16 / 9
links:
  - label: Public OOD tooling fork
    href: https://github.com/cheesss/recovery-aware-lpb-rb10
  - label: Request full implementation access
    href: mailto:chohjender@g.skku.edu?subject=Recovery-Aware%20LPB%20code%20access
featured: true
order: 1
accent: teal
---
