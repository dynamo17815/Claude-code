# NEET Marks Calculator

A simple, single-file web app to calculate your NEET score using the official marking scheme.

## Marking scheme

| Outcome      | Marks |
|--------------|-------|
| Correct      | **+4** |
| Incorrect    | **−1** |
| Unattempted  | **0**  |

Standard NEET paper = **180 questions → 720 max marks**
(Physics 45, Chemistry 45, Biology 90).

## Features

- **Total questions field** — defaults to 180 but you can change it for mock tests of any size.
- Enter **correct** and **incorrect** counts; **unattempted** is calculated automatically.
- Live result: total score, percentage, marks gained vs lost, accuracy, attempted/unattempted.
- **Subject-wise mode** — enter Physics / Chemistry / Biology separately and get a per-subject breakdown plus the overall score.
- Input validation (correct + incorrect can't exceed the total).
- Press **Enter** to calculate. Works offline — no dependencies, no internet needed.

## How to use

Just open `index.html` in any web browser. That's it.

1. (Optional) tick **Subject-wise mode** if you want a per-subject breakdown.
2. Enter your number of correct and incorrect answers.
3. Click **Calculate** (or press Enter).

## Install on your phone (home-screen app)

This is a **Progressive Web App** — once installed it gets its own icon, opens
full-screen (no browser bar), and works **offline**.

Once the site is live at `https://dynamo17815.github.io/Claude-code/`:

**Android (Chrome):** open the link → tap the **⬇ Install app** button (or
menu **⋮ → Add to Home screen / Install app**).

**iPhone (Safari):** open the link → tap **Share** → **Add to Home Screen**.

### Going live
The included GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)
publishes the app to GitHub Pages automatically on every push to `main`.
After the first successful run the app is available at the URL above.
