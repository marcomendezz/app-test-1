# Full-Stack App Planner

## When to use
Before building any full-stack app. Run this in **Claude Code (Opus 4.6)** in planning mode to generate a comprehensive architecture plan. Then copy the plan and pass it to **Gemini 3.1 Pro High** in Anti-Gravity along with Dribbble screenshots.

## Why two models?
- Opus excels at architecture, logic, and comprehensive planning
- Gemini excels at frontend design and pixel-perfect implementation
- A fresh model reviewing code catches what the builder misses (no bias)

---

## Nick's Original Prompt (Client Dashboard Example)

You're a world-class website designer with 15 years of experience designing high quality, award-winning websites for Apple and Dribbble. We'd like to build a full stack SaaS client dashboard app for our content writing business. It's very important that you get this right — our career depends on it.

As a client, we want the ability to view all pending content orders and progress in a beautiful dashboard. We also want the ability to create new content orders using a high-quality but simple form. We want the ability to configure various settings, modes, etc. And we also want anything else your usual SaaS app like this would include.

The dashboard SaaS app should use Supabase, Next.js and Tailwind CSS. We will deploy using Netlify. I'll define the UX via screenshots — don't worry about design particulars.

The flow will be: first we'll build the main functionality using a screenshot inspiration. You'll take the design style from the screenshot and build all of the signed-in pages. Then we'll make it interactive with local data and ensure routes work. Then we'll add auth and DB with Supabase. Then we'll make a landing page and finally do an end-to-end sweep to ensure everything works including auth, middleware, security, testing, etc. Then deploy and retest.

Think extremely hard and generate a great plan. Once you've developed one that is comprehensive, report back here and I'll supply some screenshots.

---

## Prompt Breakdown (what each section does)

### 1. Role Assignment
> "You're a world-class website designer with 15 years of experience..."

Sets the expertise level. The "our career depends on it" line is a hack — studies show models produce slightly higher quality output when stakes are framed as high.

### 2. App Description & Features
> "As a client, we want the ability to..."

Lists the core features without over-specifying. Leaves room for the model to suggest additional features with "anything else your usual SaaS app like this would include."
