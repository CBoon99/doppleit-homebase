# Doppleit Homebase

Doppleit Homebase is the central launcher for the Doppleit Suite — a collection of creative tools including Vector, Audio, Paint, Animate, Play, and 3D.

This version of Homebase is a minimal public release, showing only the **Doppleit Vector** tool, while preserving future expansion structure.

## 🔥 Features

- **Branded Header:** Clean layout featuring "Doppleit Homebase" and tagline
- **Single Active Tool:** Vector card only (others hidden or disabled)
- **Responsive Design:** Optimized for desktop and mobile
- **Keyboard Navigation:** Fully accessible via keyboard (Tab, Enter, Space)
- **ARIA Compliance:** Proper aria-labels, roles, and tooltips
- **Focus Indicator:** Visual outline for keyboard focus states
- **Accessible SVGs:** Title tags included for screen readers
- **Minimal JavaScript:** Handles launch routing and keyboard events

## 🚀 Routing

- **Launch Vector Tool:** `/vector`
- All other tools are hidden until ready for public use

## 🎨 Design System

- **Font:** Inter (web-safe)
- **Theme:** Doppleit orange gradient (`#e37800` ➝ `#ffbf40`)
- **Effects:** Glow on hover, pulse on focus
- **UI Framework:** No frameworks — pure HTML/CSS/JS

## 📦 Structure

- `index.html` — single file deployable to Netlify or any static host
- No build tools or dependencies

## 🔧 To Add Later

- Dynamic card loader for available tools
- Profile/auth panel (optional)
- Quick Actions: Upload, Export, Gallery (currently placeholder)
- Tool intro animations or tooltips

## 🛠 Deployment Ready

This file is tested and ready for upload to:
- `https://doppleit.com/`

## 📄 License

© Doppleit 2025 — All rights reserved.

