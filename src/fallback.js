/**
 * Single-file version of The Quiet Year card deck app
 * This is a fallback in case the modular version has issues
 */

// ============== CONSTANTS ==============
const GAME_CONSTANTS = {
    SUITS: ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    VALUES: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    SYMBOLS: {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Spades': '♠',
        'Clubs': '♣'
    },
    COLORS: {
        'Hearts': 'red',
        'Diamonds': 'red',
        'Spades': 'black',
        'Clubs': 'black'
    },
    DEFAULT_SUIT: 'Hearts',
    CARDS_PER_SUIT: 13,
    
    // Card content for The Quiet Year - simplified for the fallback version
    CARD_CONTENT: {
        'Hearts': {
            'A': {
                primary: 'A new beginning emerges',
                secondary: 'Something starts fresh in the community'
            },
            '2': {
                primary: 'Two paths diverge',
                secondary: 'A choice must be made between options'
            },
            // Add more content as needed
        }
    }
};

const UI_CONSTANTS = {
    SELECTORS: {
        HEARTS_BTN: 'heartsBtn',
        DIAMONDS_BTN: 'diamondsBtn',
        SPADES_BTN: 'spadesBtn',
        CLUBS_BTN: 'clubsBtn',
        DRAW_BTN: 'drawBtn',
        CARD_COUNT: 'cardCount',
        CARD_DISPLAY: 'cardDisplay',
        CARD_SYMBOL: 'cardSymbol',
        CARD_VALUE: 'cardValue',
        CARD_SUIT: 'cardSuit',
        CARD_PRIMARY: 'cardPrimary',
        CARD_SECONDARY: 'cardSecondary',
        CARD_HISTORY: 'cardHistory'
    },
    CLASSES: {
        SUIT_BTN: 'suit-btn',
        ACTIVE: 'active',
        HIDDEN: 'hidden',
        DISABLED: 'opacity-50 cursor-not-allowed',
        RED_CARD: 'border-red-300 text-red-600',
        BLACK_CARD: 'border-gray-300 text-gray-800',
        RED_SYMBOL: 'text-red-500 text-6xl mb-4',
        BLACK_SYMBOL: 'text-gray-800 text-6xl mb-4'
    }
};

// ============== UTILITY FUNCTIONS ==============

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
function shuffleArray(array) {
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
function createSuitDeck(suit, values, colors, symbols, cardContent) {
    const deck = [];
    values.forEach(value => {
        const content = cardContent?.[suit]?.[value] || {
            primary: `${value} of ${suit}`,
            secondary: 'Default card content'
        };
        
        deck.push({
            value,
            suit,
            color: colors[suit],
            symbol: symbols[suit],
            content: {
                primary: content.primary,
                secondary: content.secondary
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
function getElementById(id) {
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
function createCardHistoryElement(card, uiClasses) {
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

// ============== MAIN CLASS ==============

/**
 * Main class for managing The Quiet Year card deck
 */
class QuietYearDeck {
    constructor() {
        this.activeSuit = GAME_CONSTANTS.DEFAULT_SUIT;
        this.decks = {};
        this.drawnCards = [];
        
        this.initializeDecks();
        this.initEventListeners();
        this.updateUI();
        
        console.log('QuietYearDeck initialized (fallback version)');
    }

    /**
     * Initialize all suit decks
     */
    initializeDecks() {
        GAME_CONSTANTS.SUITS.forEach(suit => {
            this.decks[suit] = createSuitDeck(
                suit,
                GAME_CONSTANTS.VALUES,
                GAME_CONSTANTS.COLORS,
                GAME_CONSTANTS.SYMBOLS,
                GAME_CONSTANTS.CARD_CONTENT
            );
        });
    }

    /**
     * Set up event listeners for all buttons
     */
    initEventListeners() {
        const buttonMappings = [
            { id: UI_CONSTANTS.SELECTORS.HEARTS_BTN, suit: 'Hearts' },
            { id: UI_CONSTANTS.SELECTORS.DIAMONDS_BTN, suit: 'Diamonds' },
            { id: UI_CONSTANTS.SELECTORS.SPADES_BTN, suit: 'Spades' },
            { id: UI_CONSTANTS.SELECTORS.CLUBS_BTN, suit: 'Clubs' }
        ];

        buttonMappings.forEach(({ id, suit }) => {
            const button = getElementById(id);
            if (button) {
                button.addEventListener('click', () => this.setActiveSuit(suit));
                console.log(`Added event listener to ${id}`);
            }
        });

        const drawButton = getElementById(UI_CONSTANTS.SELECTORS.DRAW_BTN);
        if (drawButton) {
            drawButton.addEventListener('click', () => this.drawCard());
            console.log('Added event listener to draw button');
        }
    }

    /**
     * Set the active suit and update UI
     * @param {string} suit - The suit to activate
     */
    setActiveSuit(suit) {
        console.log(`setActiveSuit called with: ${suit}`);
        if (!GAME_CONSTANTS.SUITS.includes(suit)) {
            console.error(`Invalid suit: ${suit}`);
            return;
        }

        this.activeSuit = suit;
        this.updateActiveButton();
        this.updateUI();
    }

    /**
     * Update the active button styling
     */
    updateActiveButton() {
        // Remove active class from all suit buttons
        document.querySelectorAll(`.${UI_CONSTANTS.CLASSES.SUIT_BTN}`)
            .forEach(btn => btn.classList.remove(UI_CONSTANTS.CLASSES.ACTIVE));

        // Add active class to current suit button
        const activeButton = getElementById(this.activeSuit.toLowerCase() + 'Btn');
        if (activeButton) {
            activeButton.classList.add(UI_CONSTANTS.CLASSES.ACTIVE);
        }
    }

    /**
     * Draw a card from the active suit deck
     */
    drawCard() {
        console.log(`drawCard called for suit: ${this.activeSuit}`);
        const activeDeck = this.decks[this.activeSuit];
        
        if (activeDeck.length === 0) {
            alert(`No more cards in ${this.activeSuit}!`);
            return;
        }

        const card = activeDeck.pop();
        this.drawnCards.push(card);
        
        this.displayCard(card);
        this.updateHistory();
        this.updateUI();
    }

    /**
     * Display the drawn card
     * @param {Object} card - The card to display
     */
    displayCard(card) {
        const cardDisplay = getElementById(UI_CONSTANTS.SELECTORS.CARD_DISPLAY);
        const cardSymbol = getElementById(UI_CONSTANTS.SELECTORS.CARD_SYMBOL);
        const cardValue = getElementById(UI_CONSTANTS.SELECTORS.CARD_VALUE);
        const cardSuit = getElementById(UI_CONSTANTS.SELECTORS.CARD_SUIT);
        const cardPrimary = getElementById(UI_CONSTANTS.SELECTORS.CARD_PRIMARY);
        const cardSecondary = getElementById(UI_CONSTANTS.SELECTORS.CARD_SECONDARY);

        if (!cardDisplay || !cardSymbol || !cardValue || !cardSuit || !cardPrimary || !cardSecondary) {
            console.error('Card display elements not found');
            return;
        }

        // Display card identity (symbol, value, suit)
        cardSymbol.textContent = card.symbol;
        cardSymbol.className = card.color === 'red' 
            ? UI_CONSTANTS.CLASSES.RED_SYMBOL 
            : UI_CONSTANTS.CLASSES.BLACK_SYMBOL;
        
        cardValue.textContent = card.value;
        cardSuit.textContent = card.suit;

        // Display card content
        cardPrimary.textContent = card.content.primary;
        cardSecondary.textContent = card.content.secondary;

        // Show the card
        cardDisplay.classList.remove(UI_CONSTANTS.CLASSES.HIDDEN);
        
        console.log(`Card displayed: ${card.value} of ${card.suit}`);
    }

    /**
     * Add the drawn card to the history display
     */
    updateHistory() {
        const history = getElementById(UI_CONSTANTS.SELECTORS.CARD_HISTORY);
        if (!history) {
            console.error('Card history element not found');
            return;
        }

        const lastCard = this.drawnCards[this.drawnCards.length - 1];
        const cardElement = createCardHistoryElement(lastCard, UI_CONSTANTS.CLASSES);
        
        history.appendChild(cardElement);
    }

    /**
     * Update the UI elements (card count, button state)
     */
    updateUI() {
        this.updateCardCount();
        this.updateDrawButton();
    }

    /**
     * Update the card count display
     */
    updateCardCount() {
        const cardCount = getElementById(UI_CONSTANTS.SELECTORS.CARD_COUNT);
        if (cardCount) {
            cardCount.textContent = this.decks[this.activeSuit].length;
        }
    }

    /**
     * Update the draw button state
     */
    updateDrawButton() {
        const drawBtn = getElementById(UI_CONSTANTS.SELECTORS.DRAW_BTN);
        if (!drawBtn) return;

        const isEmpty = this.decks[this.activeSuit].length === 0;
        drawBtn.disabled = isEmpty;

        if (isEmpty) {
            drawBtn.classList.add(...UI_CONSTANTS.CLASSES.DISABLED.split(' '));
        } else {
            drawBtn.classList.remove(...UI_CONSTANTS.CLASSES.DISABLED.split(' '));
        }
    }

    /**
     * Get statistics about the current game state
     * @returns {Object} Game statistics
     */
    getGameStats() {
        return {
            totalCardsDrawn: this.drawnCards.length,
            cardsRemainingInActiveSuit: this.decks[this.activeSuit].length,
            cardsRemainingTotal: Object.values(this.decks).reduce((sum, deck) => sum + deck.length, 0),
            activeSuit: this.activeSuit,
            suitStats: GAME_CONSTANTS.SUITS.map(suit => ({
                suit,
                remaining: this.decks[suit].length,
                drawn: GAME_CONSTANTS.CARDS_PER_SUIT - this.decks[suit].length
            }))
        };
    }
}

// ============== APP INITIALIZATION ==============

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM content loaded, initializing fallback version');
        window.quietYearGame = new QuietYearDeck();
    } catch (error) {
        console.error('Error initializing the game:', error);
        alert('Failed to initialize the game. Please refresh the page.');
    }
});
