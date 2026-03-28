# Pantaleao Manager
**Goal:** A platform to manage tabletop games, scores, and stats for a two-player setup.

## Core Entities
- **Game:** Title, genre, play time, matches played.
- **Player:** Name, games played, matches played, win per game.
- **Session:** Date, game played, scores for Player 1 and Player 2.
- **Per Game Scoring:** Each game entity must be able to handle different types of scoring. For example, the score of game A can be just total points, but the score of game B can be a combination of different categories.
- **Stats:** Win streaks, head-to-head ratios, high scores.

## Technical Preferences
- **Styling:** Tailwind CSS + Shadcn UI.
- **State:** React Hooks (keep it simple).
- **Icons:** Lucide-react.
- **Architecture:** Follow Next.js and React best practices.
- **Coding:** Follow clean code guidelines.
- **Language:** The primary language of the platform MUST BE Portuguese (Brazil)