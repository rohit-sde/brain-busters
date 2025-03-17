<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->

# Game README

Welcome to **Memory Match Game**! This README provides an overview of how the game works, along with detailed instructions on the features of the game and how to get started.

## Table of Contents

1. [Introduction](#introduction)
2. [Gameplay Features](#gameplay-features)
3. [Game Setup](#game-setup)
4. [Themes and Customization](#themes-and-customization)
5. [Winning Condition](#winning-condition)
6. [Modal and Player Appreciation](#modal-and-player-appreciation)
7. [Credits](#credits)

---

## Introduction

Memory Match is a fun and interactive card game where players must match pairs of cards within a given time limit. The game includes a customizable experience with different themes and player settings.

---

## Gameplay Features

1. **Number of Players**: On the home page, select how many players are participating in the game.
2. **Themes and Color Customization**:
   - Toggle between **Light** and **Dark** themes using a button.
   - Choose from **five pre-defined color options** to further customize your game’s aesthetic.
3. **Player Settings**:
   - Customize each player’s **gender** and **name** before starting the game.
4. **Game Board**:
   - On the game board page, adjust the **game settings** (e.g., number of cards, difficulty).
   - Press the **Play** button to start the game.
5. **Timer**: Each player has a specific time limit for their turn to flip cards.
6. **Card Matching**: Players flip two cards per turn. If the second card matches the first, the pair is added to the matched cards list.

---

## Game Setup

1. **Home Page**: Upon entering the game, the first screen will allow you to set up the game:
   - Select the number of players.
   - Choose the **theme** (Light/Dark) via a toggle button.
   - **Change Theme Colors** by selecting from five preset options.

![Homepage Screenshot](homepage_screenshot.png)

2. **Player Information Page**: After selecting the theme and colors, each player will set up their profile:

   - Choose your **gender** (Male/Female/Other/Custom).
   - Set your **name** for the game.

![Player Information Screenshot](player_info_screenshot.png)

3. **Gameboard**: Once all players have been set up, proceed to the game board where:
   - You can adjust settings such as the **difficulty** (number of cards and matching pairs).
   - Hit **Play** to begin the game.

![Gameboard Screenshot](gameboard_screenshot.png)

---

## Winning Condition

- The game progresses as players flip cards one by one. Each player has a limited time to flip their cards.
- **Matching Cards**: If the second flipped card matches the first, they are added to the list of matched cards.
- **End Condition**: The game ends when either:
  - All the cards have been matched, or
  - A player’s time runs out.
- The player with the most matched pairs at the end of the game **wins**!

---

## Modal and Player Appreciation

Once the game ends, a **modal** will appear with:

- The **winner's name** and **image**.
- An **appreciation line** like “Great job, [Player Name]! You are the Memory Master!”.

This modal celebrates the winner’s victory and adds a fun and personal touch to the game.

---

## Credits

- **Game Developer**: [Rohit Singh]

---
