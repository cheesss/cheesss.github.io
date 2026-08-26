---
title: RAGTAL / DNA-HERO
shortTitle: RAGTAL / DNA-HERO
period: "2025"
status: Completed
summary: An RB10 imitation-learning system trained from force-feedback teleoperation data and tested through repeated real-robot rollouts.
contribution: As Learning Lead, I built the demonstration-to-rollout workflow, curated the training data, and ran 50 real-robot rollouts per evaluated model.
problem: >-
  The DNA-HERO team built a custom teleoperation system with external force/torque sensing and force feedback for collecting manipulation demonstrations on an RB10. The learning question was whether demonstrations gathered through that system could train a policy that completes the team's three manipulation tasks on the real robot, and which policy class should be deployed.
approach: >-
  As Learning Lead I owned the pipeline from demonstration preprocessing to rollout: curating the teleoperation data, training BC-Transformer and image-based diffusion policies, deploying checkpoints on the robot stack, and running RB10 rollouts. The deployed stack integrated dual RGB-D observations, OnRobot gripper I/O, and RB10 control on top of the team's teleoperation hardware.
findings: >-
  BC-Transformer and diffusion policy were compared with 50 real-robot rollouts per model. The integrated system completed 9 of 10 trials across the three manipulation tasks in the final-presentation setting; that figure reflects the presentation condition rather than a broad benchmark. The project received the Grand Prize at the Sungkyunkwan University stage of the DNA-HERO industry-academia program.
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
    aspectRatio: 30 / 13
  - src: /media/videos/ragtal-teleoperation.mp4
    poster: /media/posters/ragtal-teleoperation.webp
    alt: A custom leader arm is moved by hand while an RB10 robot mirrors the motion across three real manipulation setups.
    caption: Leader-arm teleoperation used to collect demonstrations for three task configurations.
    kind: video
    section: evidence
    autoplay: false
    aspectRatio: 16 / 9
  - src: /media/videos/ragtal-gripper-sync.mp4
    poster: /media/posters/ragtal-gripper-sync.webp
    alt: A custom leader gripper is closed by hand while the paired RB10 follower gripper mirrors the command beside a tabletop box.
    caption: Leader–follower gripper synchronization check before demonstration collection. This verifies command coupling; it is not a learned-policy rollout.
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
links:
  - label: Team learning workspace (private; access on request)
    href: https://github.com/cheesss/robomimic_DNA
  - label: Team RB10 rollout integration (private; access on request)
    href: https://github.com/cheesss/robotory_rb10_rt
  - label: Team teleoperation data tools (private; access on request)
    href: https://github.com/cheesss/teleop_data
featured: true
order: 2
accent: blue
---
