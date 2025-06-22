import { QuietYearDeck } from './QuietYearDeck.js';

/**
 * Application entry point
 * Initializes the game when the DOM is loaded
 */
class App {
    constructor() {
        this.game = null;
        console.log('App constructor initialized');
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing app...');
        if (document.readyState === 'loading') {
            console.log('Document still loading, waiting for DOMContentLoaded');
            document.addEventListener('DOMContentLoaded', () => this.startGame());
        } else {
            console.log('Document already loaded, starting game immediately');
            this.startGame();
        }
    }

    /**
     * Start the game
     */
    startGame() {
        console.log('Starting game...');
        try {
            // Check if DOM elements exist
            const requiredElements = ['heartsBtn', 'diamondsBtn', 'spadesBtn', 'clubsBtn', 'drawBtn'];
            for (const id of requiredElements) {
                const element = document.getElementById(id);
                if (!element) {
                    throw new Error(`Required element #${id} not found in the DOM`);
                }
                console.log(`Found required element: #${id}`);
            }

            // Initialize the game
            this.game = new QuietYearDeck();
            console.log('The Quiet Year card deck initialized successfully');
            
            // Add global access for debugging
            window.quietYearGame = this.game;
        } catch (error) {
            console.error('Failed to initialize The Quiet Year card deck:', error);
            this.showError(`Error: ${error.message}`);
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Initialize the application
new App();
