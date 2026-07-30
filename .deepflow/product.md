# Claude Quiz Frontend — Product Summary

## Project Name

**Claude Architect Quiz** (claude-quiz-frontend)

## Overview

Claude Quiz Frontend is a web-based, single-page practice quiz application designed to help developers prepare for the **Claude Certified Architect – Foundations (CCA-F)** certification. Users answer a set of multiple-choice questions drawn from the five core exam domains, receive immediate scored feedback with detailed answer explanations, and can compare their performance against other players on a live leaderboard.

> ⚠️ **Disclaimer:** This is unofficial study material and is not affiliated with or endorsed by Anthropic.

---

## Key Features

| Feature | Description |
|---|---|
| **Named Login** | Players enter their name before starting, enabling personalised feedback and score tracking. |
| **Personalised Welcome** | A dynamically generated welcome message greets the player and shows the five exam domain weightings. |
| **10-Question Quiz** | Multiple-choice questions spanning all CCA-F domains, presented one at a time with a progress bar and dot navigation. |
| **Instant Results** | After submission, players see their score (e.g. 7/10 · 70%), a performance message, and a question-by-question review. |
| **Answer Explanations** | Every question in the review section shows the correct answer letter and a written explanation to reinforce learning. |
| **Leaderboard** | A ranked table of the top 15 scores (player name, score, percentage, and timestamp), refreshable on demand. |
| **Responsive UI** | Mobile-first layout that collapses gracefully on small screens. |

---

## Target Users

- Developers and architects studying for the Anthropic **Claude Certified Architect – Foundations** certification.
- Teams or study groups who want to track relative progress through a shared leaderboard.
- Anyone looking to assess their knowledge of Claude's agentic architecture, MCP integrations, Claude Code, prompt engineering, and reliability patterns.

---

## Value Proposition

Preparing for a vendor certification typically requires self-directed study with limited interactive feedback. Claude Quiz Frontend solves this by providing:

- **Instant, contextual feedback** — learners know immediately which answers were wrong and *why*, reinforcing knowledge rather than just flagging errors.
- **Low friction onboarding** — no account creation or password required; just enter a name and start.
- **Competitive motivation** — the leaderboard adds a social element that encourages re-attempts and improvement.
- **Domain visibility** — the welcome screen displays the official exam domain weighting, helping learners prioritise their study time.

---

## Core Workflows

### 1. Take the Quiz
1. Open the app and enter a display name.
2. Receive a personalised welcome screen showing the five CCA-F exam domains and their weightings.
3. Answer 10 multiple-choice questions, navigating freely between them using Previous / Next buttons or the dot-navigation row.
4. Submit all answers once every question has been answered.
5. View the score summary (score, percentage, pass/fail-level colouring) and a full review of every question with the correct answer and explanation.

### 2. Review Results
- After submitting, the Results screen groups answers into Correct / Incorrect sections.
- Each incorrect (and correct) answer includes the correct option letter and a written explanation for study.
- Players can immediately retry (fetch a fresh quiz), view the leaderboard, or return home.

### 3. Track the Leaderboard
- Accessible from any screen via the "Líderes" nav button.
- Shows the top 15 all-time scores ranked by percentage, with player name, raw score, percentage, and date/time.
- The leaderboard can be manually refreshed to pick up new scores in real time.
