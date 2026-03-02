export const STORAGE_KEY = 'cozy-corner-reviews';

export function renderStars(rating) {
    const r = Math.min(5, Math.max(0, Math.round(rating) || 0));
    const filled = '★'.repeat(r);
    const empty  = '☆'.repeat(5 - r);
    return `<div class="review-stars" aria-label="${r} out of 5 stars"><span aria-hidden="true">${filled}${empty}</span></div>`;
}

export function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderReviews(items, container) {
    container.innerHTML = items.map(review => `
        <article class="review-card">
            ${renderStars(review.rating)}
            <p class="review-text">"${escapeHtml(review.text)}"</p>
            <footer class="review-author">— ${escapeHtml(review.name)}</footer>
        </article>
    `).join('');
}

export function loadReviews(seedReviews, storage = localStorage) {
    try {
        const saved = storage.getItem(STORAGE_KEY);
        if (!saved) return [...seedReviews];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [...seedReviews];
    } catch {
        return [...seedReviews];
    }
}

export function saveReviews(reviews, storage = localStorage) {
    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
        // Quota exceeded or storage unavailable
    }
}

export function validateReview({ name, rating, text }) {
    const errors = {};
    if (!name.trim())  errors.name   = 'Please enter your name.';
    if (rating === 0)  errors.rating = 'Please select a star rating.';
    if (!text.trim())  errors.text   = 'Please write your review.';
    return errors;
}
