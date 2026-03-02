import { describe, it, expect, beforeEach } from 'vitest';
import {
    renderReviews,
    loadReviews,
    saveReviews,
    validateReview,
    renderStars,
    escapeHtml,
    STORAGE_KEY,
} from './reviews.js';

// Injectable localStorage mock — avoids touching the real browser storage
const makeMockStorage = () => {
    const store = {};
    return {
        getItem:    (key)        => store[key] ?? null,
        setItem:    (key, value) => { store[key] = String(value); },
        removeItem: (key)        => { delete store[key]; },
        clear:      ()           => { Object.keys(store).forEach(k => delete store[k]); },
    };
};

const seedReviews = [
    { name: 'Emma R.',  rating: 5, text: 'Best latte in town!' },
    { name: 'David T.', rating: 5, text: 'Amazing cinnamon rolls.' },
];

// ─── Successful submission adds a review ─────────────────────────────────────

describe('successful submission adds a review', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div id="reviews-list"></div>';
        container = document.getElementById('reviews-list');
    });

    it('renders the correct number of cards after a new review is pushed', () => {
        const reviews = [...seedReviews];
        reviews.push({ name: 'Jane D.', rating: 4, text: 'Great cold brew!' });
        renderReviews(reviews, container);

        const cards = container.querySelectorAll('article.review-card');
        expect(cards.length).toBe(3);
    });

    it('displays the new reviewer name in the list', () => {
        const reviews = [...seedReviews];
        reviews.push({ name: 'Jane D.', rating: 4, text: 'Great cold brew!' });
        renderReviews(reviews, container);

        expect(container.innerHTML).toContain('Jane D.');
    });

    it('displays the new review text in the list', () => {
        const reviews = [...seedReviews];
        reviews.push({ name: 'Jane D.', rating: 4, text: 'Great cold brew!' });
        renderReviews(reviews, container);

        expect(container.innerHTML).toContain('Great cold brew!');
    });

    it('renders the correct star count for the new review', () => {
        const reviews = [{ name: 'Jane D.', rating: 4, text: 'Great cold brew!' }];
        renderReviews(reviews, container);

        const stars = container.querySelector('.review-stars');
        expect(stars.getAttribute('aria-label')).toBe('4 out of 5 stars');
    });
});

// ─── Empty submission shows validation errors ─────────────────────────────────

describe('empty submission shows validation errors', () => {
    it('returns an error for empty name', () => {
        const errors = validateReview({ name: '', rating: 3, text: 'Good coffee.' });
        expect(errors.name).toBe('Please enter your name.');
    });

    it('returns an error for missing star rating', () => {
        const errors = validateReview({ name: 'Jane', rating: 0, text: 'Good coffee.' });
        expect(errors.rating).toBe('Please select a star rating.');
    });

    it('returns an error for empty comment', () => {
        const errors = validateReview({ name: 'Jane', rating: 3, text: '' });
        expect(errors.text).toBe('Please write your review.');
    });

    it('returns all three errors when every field is empty', () => {
        const errors = validateReview({ name: '', rating: 0, text: '' });
        expect(Object.keys(errors)).toHaveLength(3);
        expect(errors.name).toBeDefined();
        expect(errors.rating).toBeDefined();
        expect(errors.text).toBeDefined();
    });

    it('returns no errors for a fully valid submission', () => {
        const errors = validateReview({ name: 'Jane', rating: 5, text: 'Loved it!' });
        expect(Object.keys(errors)).toHaveLength(0);
    });

    it('treats whitespace-only name as empty', () => {
        const errors = validateReview({ name: '   ', rating: 5, text: 'Loved it!' });
        expect(errors.name).toBe('Please enter your name.');
    });

    it('treats whitespace-only comment as empty', () => {
        const errors = validateReview({ name: 'Jane', rating: 5, text: '   ' });
        expect(errors.text).toBe('Please write your review.');
    });
});

// ─── localStorage is updated correctly ───────────────────────────────────────

describe('localStorage is updated correctly', () => {
    let storage;

    beforeEach(() => {
        storage = makeMockStorage();
    });

    it('saves the reviews array to storage after submission', () => {
        const reviews = [...seedReviews, { name: 'Jane D.', rating: 4, text: 'Great!' }];
        saveReviews(reviews, storage);

        const stored = JSON.parse(storage.getItem(STORAGE_KEY));
        expect(stored).toEqual(reviews);
    });

    it('loads saved reviews from storage on page load', () => {
        const saved = [{ name: 'Jane D.', rating: 4, text: 'Great!' }];
        storage.setItem(STORAGE_KEY, JSON.stringify(saved));

        const loaded = loadReviews(seedReviews, storage);
        expect(loaded).toEqual(saved);
    });

    it('falls back to seed reviews when storage is empty', () => {
        const loaded = loadReviews(seedReviews, storage);
        expect(loaded).toEqual(seedReviews);
    });

    it('does not duplicate seed reviews across a save and reload', () => {
        // Simulate first load → submit → save
        const reviews = [...seedReviews];
        reviews.push({ name: 'Jane D.', rating: 4, text: 'Great!' });
        saveReviews(reviews, storage);

        // Simulate page reload
        const reloaded = loadReviews(seedReviews, storage);
        const emmaCount = reloaded.filter(r => r.name === 'Emma R.').length;
        expect(emmaCount).toBe(1);
        expect(reloaded).toHaveLength(3);
    });

    it('falls back to seed reviews when stored JSON is corrupted', () => {
        storage.setItem(STORAGE_KEY, 'not-valid-json{{');
        const loaded = loadReviews(seedReviews, storage);
        expect(loaded).toEqual(seedReviews);
    });

    it('falls back to seed reviews when stored value is not an array', () => {
        storage.setItem(STORAGE_KEY, JSON.stringify({ not: 'an array' }));
        const loaded = loadReviews(seedReviews, storage);
        expect(loaded).toEqual(seedReviews);
    });
});

// ─── renderStars and escapeHtml unit tests ────────────────────────────────────

describe('renderStars', () => {
    it('renders the correct number of filled stars', () => {
        const html = renderStars(3);
        const filled = (html.match(/★/g) || []).length;
        expect(filled).toBe(3);
    });

    it('renders the correct number of empty stars', () => {
        const html = renderStars(3);
        const empty = (html.match(/☆/g) || []).length;
        expect(empty).toBe(2);
    });

    it('clamps ratings above 5 to 5', () => {
        const html = renderStars(99);
        expect(html).toContain('aria-label="5 out of 5 stars"');
    });

    it('clamps negative ratings to 0', () => {
        const html = renderStars(-1);
        expect(html).toContain('aria-label="0 out of 5 stars"');
    });

    it('rounds float ratings', () => {
        const html = renderStars(3.7);
        expect(html).toContain('aria-label="4 out of 5 stars"');
    });
});

describe('escapeHtml', () => {
    it('escapes < and > to prevent XSS', () => {
        expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
    });

    it('escapes & characters', () => {
        expect(escapeHtml('tea & coffee')).toBe('tea &amp; coffee');
    });
});
