import { GAME_CONSTANTS, UI_CONSTANTS } from './constants.js';
import { createSuitDeck, getElementById, createCardHistoryElement } from './utils.js';

/**
 * Main class for managing The Quiet Year card deck
 */
export class QuietYearDeck {
    constructor() {
        this.activeSuit = GAME_CONSTANTS.DEFAULT_SUIT;
        this.decks = {};
        this.drawnCards = [];
        
        this.initializeDecks();
        this.initEventListeners();
        this.updateUI();
    }    /**
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
            }
        });

        const drawButton = getElementById(UI_CONSTANTS.SELECTORS.DRAW_BTN);
        if (drawButton) {
            drawButton.addEventListener('click', () => this.drawCard());
        }
    }

    /**
     * Set the active suit and update UI
     * @param {string} suit - The suit to activate
     */
    setActiveSuit(suit) {
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
    }    /**
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
