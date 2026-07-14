/**
 * PlanTatil 2.0 Reusable Travel Card Component
 * Uses shared styles from core.css and localization from locales.js
 */

class TravelCard {
    constructor(data, options = {}) {
        this.data = {
            id: data.id || 'card_' + Math.random().toString(36).substr(2, 9),
            title: data.title || 'Yeni Durak',
            type: data.type || 'place', // place, food, coffee, shop, photo, child
            time: data.time || '10:00',
            duration: data.duration || 30, // in minutes
            cost: data.cost || 'Ücretsiz',
            location: data.location || '',
            description: data.description || '',
            rating: data.rating || 4.5,
            completed: data.completed || false,
            votes: data.votes || 0,
            userVote: data.userVote || null, // 'up', 'down', or null
            modes: data.modes || [], // child-friendly, gourmet, heavy, budget
            comments: data.comments || []
        };
        
        this.options = {
            compact: options.compact || false,
            interactive: options.interactive !== false,
            lang: options.lang || 'tr',
            onStateChange: options.onStateChange || null
        };
        
        this.element = null;
    }
    
    getTranslation(key, defaultValue = '') {
        const lang = this.options.lang;
        if (window.PLAN_TATIL_LOCALES && window.PLAN_TATIL_LOCALES[lang] && window.PLAN_TATIL_LOCALES[lang][key]) {
            return window.PLAN_TATIL_LOCALES[lang][key];
        }
        // Local fallback dictionary if script is missing
        const fallback = {
            tr: { completed: 'Gezildi', mark_completed: 'Gezildi İşaretle', budget: 'Bütçe', free: 'Ücretsiz', duration_mins: 'dk ziyaret' },
            en: { completed: 'Visited', mark_completed: 'Mark as Visited', budget: 'Budget', free: 'Free', duration_mins: 'min visit' }
        };
        return (fallback[lang] && fallback[lang][key]) || defaultValue || key;
    }
    
    getTypeIcon() {
        const icons = {
            place: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
            food: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
            coffee: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></svg>`,
            shop: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>`,
            photo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
            child: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>`
        };
        return icons[this.data.type] || icons.place;
    }
    
    render(container) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `pt-card travel-card ${this.data.completed ? 'completed' : ''} ${this.options.compact ? 'compact-view' : ''}`;
        cardDiv.id = this.data.id;
        
        let modesHtml = '';
        if (this.data.modes && this.data.modes.length > 0) {
            modesHtml = `<div class="card-modes">` + 
                this.data.modes.map(m => {
                    const label = this.getTranslation(m, m);
                    return `<span class="mode-badge badge-${m}">${label}</span>`;
                }).join('') + 
            `</div>`;
        }
        
        let innerHTML = '';
        
        // Localize cost display if it's 'Ücretsiz' or 'Free'
        let costDisplay = this.data.cost;
        if (costDisplay === 'Ücretsiz' || costDisplay === 'Free') {
            costDisplay = this.getTranslation('free');
        }
        
        if (this.options.compact) {
            innerHTML = `
                <div class="compact-header">
                    <span class="card-time">${this.data.time}</span>
                    <span class="card-icon-wrapper ${this.data.type}">${this.getTypeIcon()}</span>
                    <div class="compact-title-group">
                        <h4 class="card-title">${this.data.title}</h4>
                        <span class="card-duration">${this.data.duration} dk</span>
                    </div>
                    <div class="compact-actions">
                        <span class="card-cost">${costDisplay}</span>
                        <button class="btn-check ${this.data.completed ? 'checked' : ''}" title="${this.getTranslation('mark_completed')}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Detailed View
            innerHTML = `
                <div class="card-glow-effect"></div>
                <div class="card-header-bar">
                    <div class="header-left">
                        <span class="card-time-badge">${this.data.time}</span>
                        <span class="card-duration-badge">${this.data.duration} ${this.getTranslation('duration_mins')}</span>
                    </div>
                    <div class="header-right">
                        <span class="card-type-icon ${this.data.type}" title="${this.getTranslation(this.data.type, this.data.type).toUpperCase()}">${this.getTypeIcon()}</span>
                    </div>
                </div>
                
                <h3 class="card-title">${this.data.title}</h3>
                
                ${this.data.location ? `
                    <div class="card-meta-row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span class="card-location">${this.data.location}</span>
                    </div>
                ` : ''}
                
                <p class="card-desc">${this.data.description}</p>
                
                ${modesHtml}
                
                <div class="card-footer-metrics">
                    <div class="metric-cost">
                        <span class="metric-label">${this.getTranslation('budget')}:</span>
                        <span class="metric-value">${costDisplay}</span>
                    </div>
                    <div class="metric-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" style="color: #fbbf24;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span class="rating-val">${this.data.rating}</span>
                    </div>
                </div>
                
                ${this.options.interactive ? `
                    <div class="card-action-bar">
                        <button class="action-btn toggle-complete-btn ${this.data.completed ? 'active' : ''}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                            <span>${this.getTranslation(this.data.completed ? 'completed' : 'mark_completed')}</span>
                        </button>
                        
                        <div class="vote-widget">
                            <button class="vote-btn vote-up ${this.data.userVote === 'up' ? 'active' : ''}" title="${this.getTranslation('upvote_tooltip')}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
                            </button>
                            <span class="vote-count">${this.data.votes}</span>
                            <button class="vote-btn vote-down ${this.data.userVote === 'down' ? 'active' : ''}" title="${this.getTranslation('downvote_tooltip')}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                        </div>
                    </div>
                ` : ''}
            `;
        }
        
        cardDiv.innerHTML = innerHTML;
        
        // Attach Event Listeners
        if (this.options.interactive) {
            if (this.options.compact) {
                const checkBtn = cardDiv.querySelector('.btn-check');
                if (checkBtn) {
                    checkBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleComplete(cardDiv);
                    });
                }
            } else {
                const compBtn = cardDiv.querySelector('.toggle-complete-btn');
                if (compBtn) {
                    compBtn.addEventListener('click', () => this.toggleComplete(cardDiv));
                }
                
                const upBtn = cardDiv.querySelector('.vote-up');
                const downBtn = cardDiv.querySelector('.vote-down');
                const voteCountEl = cardDiv.querySelector('.vote-count');
                
                if (upBtn && downBtn) {
                    upBtn.addEventListener('click', () => this.handleVote('up', upBtn, downBtn, voteCountEl));
                    downBtn.addEventListener('click', () => this.handleVote('down', upBtn, downBtn, voteCountEl));
                }
            }
        }
        
        this.element = cardDiv;
        
        if (container) {
            container.appendChild(cardDiv);
        }
        return cardDiv;
    }
    
    toggleComplete(cardElement) {
        this.data.completed = !this.data.completed;
        cardElement.classList.toggle('completed', this.data.completed);
        
        if (this.options.compact) {
            const checkBtn = cardElement.querySelector('.btn-check');
            if (checkBtn) checkBtn.classList.toggle('checked', this.data.completed);
        } else {
            const btn = cardElement.querySelector('.toggle-complete-btn');
            if (btn) {
                btn.classList.toggle('active', this.data.completed);
                btn.querySelector('span').textContent = this.getTranslation(this.data.completed ? 'completed' : 'mark_completed');
            }
        }
        
        // Trigger callback
        if (this.options.onStateChange) {
            this.options.onStateChange(this.data);
        }
    }
    
    handleVote(direction, upBtn, downBtn, countEl) {
        if (this.data.userVote === direction) {
            this.data.userVote = null;
            this.data.votes += (direction === 'up' ? -1 : 1);
        } else {
            let delta = 0;
            if (this.data.userVote === 'up') delta -= 1;
            if (this.data.userVote === 'down') delta += 1;
            
            this.data.userVote = direction;
            delta += (direction === 'up' ? 1 : -1);
            this.data.votes += delta;
        }
        
        upBtn.classList.toggle('active', this.data.userVote === 'up');
        downBtn.classList.toggle('active', this.data.userVote === 'down');
        countEl.textContent = this.data.votes;
        
        if (this.options.onStateChange) {
            this.options.onStateChange(this.data);
        }
    }
}

// Add Stylesheets dynamically if needed
const style = document.createElement('style');
style.textContent = `
    .travel-card {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .travel-card.completed {
        border-color: rgba(16, 185, 129, 0.3) !important;
        background: rgba(16, 185, 129, 0.04) !important;
    }
    
    .travel-card.completed .card-title {
        text-decoration: line-through;
        opacity: 0.6;
    }
    
    .travel-card.completed .card-desc {
        opacity: 0.5;
    }
    
    .card-glow-effect {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 4px;
        background: var(--primary-gradient);
        opacity: 0;
        transition: var(--transition);
    }
    
    .travel-card:hover .card-glow-effect {
        opacity: 1;
    }
    
    .card-header-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .header-left {
        display: flex;
        gap: 0.5rem;
    }
    
    .card-time-badge {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        background: var(--primary-glow);
        color: var(--primary);
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 4px;
    }
    
    .card-duration-badge {
        font-size: 0.75rem;
        color: var(--text-secondary);
        padding: 0.2rem 0;
    }
    
    .card-type-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-color);
    }
    
    .card-type-icon.place { color: #3b82f6; border-color: rgba(59, 130, 246, 0.2); }
    .card-type-icon.food { color: #f43f5e; border-color: rgba(244, 63, 94, 0.2); }
    .card-type-icon.coffee { color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
    .card-type-icon.shop { color: #ec4899; border-color: rgba(236, 72, 153, 0.2); }
    .card-type-icon.photo { color: #eab308; border-color: rgba(234, 179, 8, 0.2); }
    .card-type-icon.child { color: #a855f7; border-color: rgba(168, 85, 247, 0.2); }
    
    .card-title {
        font-family: var(--font-heading);
        font-size: 1.15rem;
        color: var(--text-primary);
        font-weight: 600;
        margin-top: 0.25rem;
    }
    
    .card-meta-row {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.75rem;
        color: var(--text-secondary);
    }
    
    .card-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0.25rem 0;
    }
    
    .card-modes {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin: 0.25rem 0;
    }
    
    .mode-badge {
        font-size: 0.65rem;
        font-weight: 600;
        padding: 0.15rem 0.45rem;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }
    
    .badge-child, .badge-child-friendly { background: rgba(168, 85, 247, 0.1); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.2); }
    .badge-food, .badge-gourmet { background: rgba(244, 63, 94, 0.1); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.2); }
    .badge-heavy { background: rgba(249, 115, 22, 0.1); color: #fdba74; border: 1px solid rgba(249, 115, 22, 0.2); }
    .badge-budget { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
    
    .card-footer-metrics {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        border-top: 1px solid rgba(255, 255, 255, 0.04);
        padding-top: 0.75rem;
        margin-top: 0.25rem;
    }
    
    .metric-cost .metric-label {
        color: var(--text-muted);
    }
    .metric-cost .metric-value {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .metric-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .card-action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        gap: 0.75rem;
    }
    
    .action-btn {
        flex: 1;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-family: var(--font-heading);
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        transition: var(--transition);
    }
    
    .action-btn:hover {
        background: rgba(255,255,255,0.08);
        color: var(--text-primary);
        border-color: var(--border-color-hover);
    }
    
    .action-btn.active {
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border-color: rgba(16, 185, 129, 0.3);
    }
    
    .vote-widget {
        display: flex;
        align-items: center;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 0.15rem;
    }
    
    .vote-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        transition: var(--transition);
    }
    
    .vote-btn:hover {
        background: rgba(255,255,255,0.05);
        color: var(--text-primary);
    }
    
    .vote-btn.active {
        color: var(--primary);
    }
    
    .vote-count {
        font-size: 0.75rem;
        font-weight: 700;
        width: 24px;
        text-align: center;
        color: var(--text-primary);
    }
    
    /* Compact View Styles */
    .travel-card.compact-view {
        padding: 0.75rem 1rem;
    }
    
    .compact-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
    }
    
    .card-time {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--primary);
        width: 45px;
    }
    
    .card-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: rgba(255,255,255,0.03);
    }
    
    .card-icon-wrapper.place { color: #3b82f6; }
    .card-icon-wrapper.food { color: #f43f5e; }
    .card-icon-wrapper.coffee { color: #10b981; }
    .card-icon-wrapper.shop { color: #ec4899; }
    .card-icon-wrapper.photo { color: #eab308; }
    .card-icon-wrapper.child { color: #a855f7; }
    
    .compact-title-group {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    .compact-title-group .card-title {
        font-size: 0.9rem;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }
    
    .compact-title-group .card-duration {
        font-size: 0.7rem;
        color: var(--text-muted);
    }
    
    .compact-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .compact-actions .card-cost {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--text-secondary);
    }
    
    .btn-check {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255,255,255,0.03);
        border: 1.5px solid var(--border-color);
        color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .btn-check:hover {
        border-color: var(--secondary);
        color: rgba(16, 185, 129, 0.4);
    }
    
    .btn-check.checked {
        background: var(--secondary);
        border-color: var(--secondary);
        color: #fff;
    }
`;
document.head.appendChild(style);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelCard;
} else {
    window.TravelCard = TravelCard;
}
