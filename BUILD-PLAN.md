# Customer Reviews Feature — Build Plan

## Step 1 — HTML skeleton ✅
Add `<section id="reviews">` to index.html with a heading and 2–3 hardcoded review cards (name, stars as Unicode `★`, and quote text). No JS, no CSS yet — just verify the raw structure renders.

**Fixes applied during review:**
- Deferred `<article>` / `<footer>` semantic fixes to Step 2 (applied there instead)
- Deferred `aria-label` on star display to Step 2 (applied there instead)

## Step 2 — Render reviews from JavaScript ✅
Replace hardcoded HTML cards with a JS array of `{ name, rating, text }` objects and a `renderReviews()` function. Delete static cards from HTML. Verified the same cards appear, now JS-driven.

**Fixes applied during review:**
- `<div class="review-card">` → `<article>` (semantic)
- `<p class="review-author">` → `<footer>` (semantic)
- `aria-label="${r} out of 5 stars"` + `aria-hidden="true"` on star spans (accessibility)
- `renderStars` hardened: `Math.min/max/round` clamp + `|| 0` guard against `NaN`, negatives, floats, and values > 5

## Step 3 — Submission form HTML + CSS ✅
Added form below `#reviews-list`: name input, clickable star picker, textarea, submit button. Styled to match site design system. No JS wiring yet.

**Fixes applied during review:**
- `aria-labelledby` replaces disconnected `<label>` + duplicate `aria-label="Star rating"` on radiogroup
- Stars 2–5 changed from `tabindex="0"` to `tabindex="-1"` (roving tabindex pattern)

## Step 4 — Interactive star picker + form capture ✅
Star picker: `mouseenter`/`mouseleave` hover highlight, click to lock selection, arrow key navigation with roving tabindex. Form submit: `e.preventDefault()` + `console.log({ name, rating, text })`.

**Fixes applied during review:**
- `mouseover` → `mouseenter` / `mouseout` → `mouseleave` (prevents child-element flicker)
- Arrow key handler now updates `tabindex` on both source and target star (Tab-away/Tab-back now lands correctly)
- `escapeHtml()` added to `renderReviews` to prevent XSS via `innerHTML`
- `renderReviews` parameter renamed from `reviews` to `items` (was shadowing outer variable)
- `reviewsList` cached outside `renderReviews` (avoids repeated DOM lookup)
- `setSelectedRating(n)` extracted to consolidate duplicated star state logic

## Step 5 — Append to DOM ✅
On valid submit: push new review object to `reviews` array, call `renderReviews(reviews)` to re-render all cards, reset form via `reviewForm.reset()` + `setSelectedRating(0)`.

## Step 6 — Inline validation ✅
Three checks before submit: name non-empty, rating > 0, text non-empty. Shows inline `<span class="field-error" role="alert">` messages per field. `.invalid` class adds red border/outline. Errors clear on `input` event (name/text) and on star click (rating).

**Fix applied during review:**
- Errors cleared at top of submit handler before re-validating, so `role="alert"` always triggers a DOM change and re-announces on repeated failed submits

## Step 7 — localStorage persistence ✅
`loadReviews()`: reads from `localStorage`, falls back to `[...seedReviews]` if empty. `saveReviews()`: serialises full `reviews` array after each successful submit. Both wrapped in `try/catch` for parse errors and quota failures.

**Fix applied during review:**
- `Array.isArray(parsed)` guard added — prevents `TypeError` if storage contains valid JSON that isn't an array
