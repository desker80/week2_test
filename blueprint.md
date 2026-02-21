# Isaac Lab Learning Hub

## Overview
An interactive dashboard and learning resource for **Isaac Lab**, the unified framework for robot learning built on NVIDIA Isaac Sim. This hub provides quick access to documentation, CLI commands, and a 3D simulation preview to help developers practice and understand robotics simulation.

## Features
*   **3D Simulation Preview:** A Three.js powered 3D environment representing the Isaac Sim grid and a robotic placeholder.
*   **CLI Cheat Sheet:** Quick reference for common Isaac Lab commands (training, playback, environment creation).
*   **Environment Explorer:** Visual cards for popular RL environments included in Isaac Lab (e.g., Anymal, Franka, Humanoid).
*   **High-Tech Dashboard UI:** A dark-themed, responsive interface with interactive "Simulation Status" monitors.
*   **Documentation Shortcuts:** Direct links to Installation, Reinforcement Learning, and API tutorials.

## Design
*   **Palette:** Deep charcoal backgrounds (`#0a0a0a`), NVIDIA green accents (`#76b900`), and neon glow effects.
*   **Typography:** Monospace fonts for CLI sections and clean sans-serif for the dashboard.
*   **Visuals:** Subtle noise textures and multi-layered shadows for a premium, technical feel.

## Current Plan
1.  **Environment Setup:** Integrate Three.js via CDN in `index.html`.
2.  **Dashboard Layout:** Create a grid-based dashboard with sections for the 3D viewport, CLI tools, and environment list.
3.  **3D Implementation:** Initialize a Three.js scene in `main.js` with a ground grid and basic interactive robot geometry.
4.  **Styling:** Apply modern CSS (Baseline) with container queries and `:has()` for interactive components.
5.  **Validation:** Ensure the dashboard is responsive and the 3D scene renders smoothly.
