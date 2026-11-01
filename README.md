# Navbar-04

A modern, responsive navbar UI built with React and Vite. This project demonstrates a polished glassmorphism-style navigation bar with animated hover states, mobile menu behavior, scroll-based hiding, and a progress indicator.

## Overview

This project is designed as a reusable landing-page navigation component for a website or portfolio. It includes:

- Animated desktop navigation links
- Mobile menu toggle with smooth transitions
- Active section highlighting
- Scroll-aware navbar hide/show behavior
- Gradient CTA button and progress bar
- Responsive layout for desktop and mobile devices

## Tech Stack

- React 19
- Vite 8
- JavaScript
- Framer Motion
- Tailwind CSS

## Project Structure

```bash
Navbar-04/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       └── Navbar.jsx
├── .gitignore
├── .oxlintrc.json
├── .pnp.cjs
├── .pnp.loader.mjs
├── yarn.lock
└── README.md
```

## Features

- Glassmorphism-inspired navigation bar
- Smooth motion effects using Framer Motion
- Scroll progress tracking
- Responsive mobile menu
- Gradient brand icon and highlight states
- Minimal but modern dark theme

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gavithgethmin01/Navbar-04.git
cd Navbar-04
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn install
```

### 3. Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev     # Start the Vite development server
npm run build   # Build the production bundle
npm run preview # Preview the production build
npm run lint    # Run the project lint check
```

## Customization

You can modify the navigation content in `src/components/Navbar.jsx`:

- Update the brand name
- Add or remove nav links in `LINKS`
- Adjust color palette and button styling
- Change motion timing and animation behavior

Example link configuration:

```jsx
const LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];
```

## Notes

- This project is currently configured as a simple front-end UI demo and does not include a backend.
- No explicit license has been added yet for the repository.

## Contributing

Contributions, improvements, and UI refinements are welcome. Feel free to fork the project and submit a pull request.
