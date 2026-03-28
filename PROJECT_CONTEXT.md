# Pantaleao Manager
**Goal:** A platform to manage tabletop games, scores, and stats for a two-player setup.

## Core Entities
- **Game:** Title, genre, play time, matches played, expansions.
- **Player:** Name, games played, matches played, win per game.
- **Session:** Date, game played, scores for Player 1 and Player 2.
- **Per Game Scoring:** Each game entity must be able to handle different types of scoring. For example, the score of game A can be just total points, but the score of game B can be a combination of different categories.
- **Stats:** Win streaks, head-to-head ratios, high scores.

## Entities: Player
- **ID:** UUID.
- **Name:** String.
- **Avatar:** Simple color or emoji (keep it low-cost/no external assets).
- **Stats (Calculated):** Total games played, total wins, wins per game.

## Scoring Logic
- **Simple Score:** A single number (e.g., Azul).
- **Categorized Score:** Multiple named fields with emojis (e.g., 7 Wonders Duel: 🏛️ Civilian, 🧪 Science, 🎖️ Military).
- **Game Definition:** Each Game entity should now include a `scoringType` ('simple' | 'categories') and an optional `scoreCategories` array.

## Technical Preferences
- **Styling:** Tailwind CSS + Shadcn UI.
- **State:** React Hooks (keep it simple).
- **Icons:** Lucide-react.
- **Architecture:** Follow Next.js and React best practices.
- **Coding:** Follow clean code guidelines.
- **Language:** The primary language of the platform MUST BE Portuguese (Brazil)