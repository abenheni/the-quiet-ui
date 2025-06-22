// Game constants for The Quiet Year card deck
export const GAME_CONSTANTS = {
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
    
    // Card content for The Quiet Year
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
            '3': {
                primary: 'Three voices speak',
                secondary: 'Different perspectives come to light'
            },
            '4': {
                primary: 'Foundation is built',
                secondary: 'Something stable takes root'
            },
            '5': {
                primary: 'Change brings uncertainty',
                secondary: 'Old ways are challenged'
            },
            '6': {
                primary: 'Balance is sought',
                secondary: 'Harmony must be restored'
            },
            '7': {
                primary: 'Secrets are revealed',
                secondary: 'Hidden truths come to light'
            },
            '8': {
                primary: 'Strength in unity',
                secondary: 'Working together brings power'
            },
            '9': {
                primary: 'Near completion',
                secondary: 'Something approaches its end'
            },
            '10': {
                primary: 'Cycle fulfilled',
                secondary: 'A chapter closes completely'
            },
            'J': {
                primary: 'Young energy arrives',
                secondary: 'New ideas challenge tradition'
            },
            'Q': {
                primary: 'Wisdom guides action',
                secondary: 'Experience shows the way'
            },
            'K': {
                primary: 'Authority decides',
                secondary: 'Leadership must take responsibility'
            }
        },
        'Diamonds': {
            'A': {
                primary: 'Valuable discovery made',
                secondary: 'Something precious is found'
            },
            '2': {
                primary: 'Resources are shared',
                secondary: 'Wealth benefits the community'
            },
            '3': {
                primary: 'Trade opportunities',
                secondary: 'Exchange creates new possibilities'
            },
            '4': {
                primary: 'Secure foundation',
                secondary: 'Material stability is achieved'
            },
            '5': {
                primary: 'Loss threatens security',
                secondary: 'Scarcity brings difficult choices'
            },
            '6': {
                primary: 'Generosity flows',
                secondary: 'Sharing creates abundance'
            },
            '7': {
                primary: 'Investment pays off',
                secondary: 'Past efforts yield rewards'
            },
            '8': {
                primary: 'Skilled work flourishes',
                secondary: 'Craftsmanship brings prosperity'
            },
            '9': {
                primary: 'Abundance achieved',
                secondary: 'Material needs are met'
            },
            '10': {
                primary: 'Wealth established',
                secondary: 'Lasting prosperity secured'
            },
            'J': {
                primary: 'New ventures begin',
                secondary: 'Ambitious projects take shape'
            },
            'Q': {
                primary: 'Practical wisdom',
                secondary: 'Experience guides resource use'
            },
            'K': {
                primary: 'Master of resources',
                secondary: 'Wealth serves greater purpose'
            }
        },
        'Spades': {
            'A': {
                primary: 'Breakthrough moment',
                secondary: 'Sharp insight cuts through confusion'
            },
            '2': {
                primary: 'Difficult balance',
                secondary: 'Two opposing forces create tension'
            },
            '3': {
                primary: 'Heartbreak divides',
                secondary: 'Pain separates what was united'
            },
            '4': {
                primary: 'Rest after struggle',
                secondary: 'Pause before the next challenge'
            },
            '5': {
                primary: 'Conflict erupts',
                secondary: 'Disagreement threatens peace'
            },
            '6': {
                primary: 'Moving beyond pain',
                secondary: 'Healing journey begins'
            },
            '7': {
                primary: 'Deception revealed',
                secondary: 'Hidden motives come to light'
            },
            '8': {
                primary: 'Trapped by circumstances',
                secondary: 'Limitations constrain action'
            },
            '9': {
                primary: 'Anxiety overwhelms',
                secondary: 'Fear paralyzes progress'
            },
            '10': {
                primary: 'Painful ending',
                secondary: 'Necessary conclusion brings sorrow'
            },
            'J': {
                primary: 'Rash action taken',
                secondary: 'Impulsive decisions have consequences'
            },
            'Q': {
                primary: 'Clear-eyed judgment',
                secondary: 'Truth spoken without sentiment'
            },
            'K': {
                primary: 'Authoritative decision',
                secondary: 'Power used to cut through problems'
            }
        },
        'Clubs': {
            'A': {
                primary: 'Creative spark ignites',
                secondary: 'New inspiration drives action'
            },
            '2': {
                primary: 'Planning the future',
                secondary: 'Vision guides next steps'
            },
            '3': {
                primary: 'Collaborative effort',
                secondary: 'Working together creates progress'
            },
            '4': {
                primary: 'Celebration of achievement',
                secondary: 'Success brings community together'
            },
            '5': {
                primary: 'Competition emerges',
                secondary: 'Rivalry tests relationships'
            },
            '6': {
                primary: 'Victory recognized',
                secondary: 'Achievement earns respect'
            },
            '7': {
                primary: 'Standing firm',
                secondary: 'Defending position against pressure'
            },
            '8': {
                primary: 'Swift progress',
                secondary: 'Momentum carries projects forward'
            },
            '9': {
                primary: 'Resilience tested',
                secondary: 'Strength to continue despite obstacles'
            },
            '10': {
                primary: 'Burden of responsibility',
                secondary: 'Heavy load challenges endurance'
            },
            'J': {
                primary: 'Enthusiastic messenger',
                secondary: 'New information energizes action'
            },
            'Q': {
                primary: 'Passionate leadership',
                secondary: 'Emotional intelligence guides others'
            },
            'K': {
                primary: 'Visionary command',
                secondary: 'Inspiring others to achieve greatness'
            }
        }
    }
};

export const UI_CONSTANTS = {
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
