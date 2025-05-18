import { createNewDeck, drawCards } from './api.js';

export class WarGame {
    constructor(ui) {
        this.ui = ui;
        this.deckId = '';
        this.player1Cards = [];
        this.player2Cards = [];
        this.gameInProgress = false;
        this.warCards = [];
        this.inWar = false;
    }

    async startGame() {
        try {
            // Reset game state
            this.player1Cards = [];
            this.player2Cards = [];
            this.warCards = [];
            this.inWar = false;
            this.gameInProgress = true;
            
            this.ui.resetUI();
            this.ui.setMessage('Game started! Click "Play Round" to begin.');
            this.ui.toggleButtons(true);

            // Get a new shuffled deck
            const deckData = await createNewDeck();
            this.deckId = deckData.deck_id;
            
            // Draw 52 cards (full deck)
            const drawData = await drawCards(this.deckId, 52);
            
            // Split cards between players
            const allCards = drawData.cards;
            for (let i = 0; i < allCards.length; i++) {
                if (i % 2 === 0) {
                    this.player1Cards.push(allCards[i]);
                } else {
                    this.player2Cards.push(allCards[i]);
                }
            }
            
            this.ui.updateCardCounts(this.player1Cards.length, this.player2Cards.length);
            
        } catch (error) {
            console.error('Error starting game:', error);
            this.ui.setMessage('Error starting game. Please try again.');
            this.resetGame();
        }
    }

    playRound() {
        if (!this.gameInProgress) return;
        
        console.log('Play round called', {
            gameInProgress: this.gameInProgress,
            player1Cards: this.player1Cards.length,
            player2Cards: this.player2Cards.length
        });

        // Clear previous messages
        this.ui.clearWarMessage();
        
        // Check if game is over
        if (this.player1Cards.length === 0 || this.player2Cards.length === 0) {
            this.endGame();
            return;
        }
        
        // Draw cards for the round
        const player1Card = this.player1Cards.shift();
        const player2Card = this.player2Cards.shift();
        
        // Display the cards
        this.ui.displayCard(player1Card, 'player1');
        this.ui.displayCard(player2Card, 'player2');
        
        // Add to war cards
        if (this.inWar) {
            this.warCards.push(player1Card, player2Card);
        } else {
            this.warCards = [player1Card, player2Card];
        }
        
        // Compare the cards
        const comparison = this.compareCards(player1Card, player2Card);
        
        if (comparison === 1) {
            // Player 1 wins the round
            this.player1Cards.push(...this.warCards);
            this.warCards = [];
            this.inWar = false;
            this.ui.setMessage('Player 1 wins the round!');
            this.ui.updateCardCounts(this.player1Cards.length, this.player2Cards.length);
        } else if (comparison === -1) {
            // Player 2 wins the round
            this.player2Cards.push(...this.warCards);
            this.warCards = [];
            this.inWar = false;
            this.ui.setMessage('Player 2 wins the round!');
            this.ui.updateCardCounts(this.player1Cards.length, this.player2Cards.length);
        } else {
            // War!
            this.inWar = true;
            this.ui.setMessage('War!');
            this.ui.setWarMessage('Drawing 3 additional cards each...');
            
            // Check if players have enough cards for war
            if (this.player1Cards.length < 4 || this.player2Cards.length < 4) {
                // Not enough cards for war - end game
                this.endGame();
                return;
            }
            
            // Draw 3 cards face down for each player
            const player1WarCards = this.player1Cards.splice(0, 3);
            const player2WarCards = this.player2Cards.splice(0, 3);
            
            // Add to war pile
            this.warCards.push(...player1WarCards, ...player2WarCards);
            
            // Display war cards
            this.ui.displayWarCards(player1WarCards, player2WarCards);
        }
        
        console.log('Round result', {
            comparison,
            player1Count: this.player1Cards.length,
            player2Count: this.player2Cards.length,
            warCards: this.warCards.length,
            inWar: this.inWar
        });

        // Check if game is over after this round
        if (this.player1Cards.length === 0 || this.player2Cards.length === 0) {
            this.endGame();
        }
    }
    
    compareCards(card1, card2) {
        const values = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, 
            '8': 8, '9': 9, '10': 10, 'JACK': 11, 
            'QUEEN': 12, 'KING': 13, 'ACE': 14
        };
        
        const val1 = values[card1.value];
        const val2 = values[card2.value];
        
        if (val1 > val2) return 1;
        if (val1 < val2) return -1;
        return 0;
    }
    
    endGame() {
        this.gameInProgress = false;
        this.ui.toggleButtons(false);
        
        if (this.player1Cards.length > this.player2Cards.length) {
            this.ui.setMessage('Player 1 wins the game!');
        } else if (this.player2Cards.length > this.player1Cards.length) {
            this.ui.setMessage('Player 2 wins the game!');
        } else {
            this.ui.setMessage('The game ended in a tie!');
        }
    }
    
    resetGame() {
        this.gameInProgress = false;
        this.ui.toggleButtons(false);
        this.player1Cards = [];
        this.player2Cards = [];
        this.warCards = [];
        this.inWar = false;
        this.ui.updateCardCounts(0, 0);
    }
}