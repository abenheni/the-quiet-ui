// Utility functions for The Quiet Year card deck

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Creates a deck of cards for a specific suit
 * @param {string} suit - The suit name
 * @param {Array} values - Array of card values
 * @param {Object} colors - Object mapping suits to colors
 * @param {Object} symbols - Object mapping suits to symbols
 * @param {Object} cardContent - Object containing card content by suit and value
 * @returns {Array} - Array of card objects
 */
export function createSuitDeck(suit, values, colors, symbols, cardContent) {
    const deck = [];
    values.forEach(value => {
        deck.push({
            value,
            suit,
            color: colors[suit],
            symbol: symbols[suit],
            content: {
                primary: cardContent?.[suit]?.[value]?.primary || 'No primary content',
                secondary: cardContent?.[suit]?.[value]?.secondary || 'No secondary content'
            }
        });
    });
    return shuffleArray(deck);
}

/**
 * Gets DOM element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement} - DOM element
 */
export function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with ID '${id}' not found`);
    }
    return element;
}

/**
 * Creates a card element for the history display
 * @param {Object} card - Card object
 * @param {Object} uiClasses - UI class constants
 * @returns {HTMLElement} - Card DOM element
 */
export function createCardHistoryElement(card, uiClasses) {
    const cardElement = document.createElement('div');
    const cardClass = card.color === 'red' ? uiClasses.RED_CARD : uiClasses.BLACK_CARD;
    cardElement.className = `p-2 border rounded ${cardClass} cursor-pointer hover:shadow-md transition-shadow`;
    cardElement.innerHTML = `
        <div class="text-sm font-semibold">${card.value}</div>
        <div class="text-xs">${card.symbol}</div>
    `;
    
    // Store card data for tooltip or click events
    cardElement.dataset.suit = card.suit;
    cardElement.dataset.value = card.value;
    cardElement.dataset.primary = card.content.primary;
    cardElement.dataset.secondary = card.content.secondary;
    
    // Add title attribute for quick reference on hover
    cardElement.title = `${card.content.primary}`;
    
    return cardElement;
}
