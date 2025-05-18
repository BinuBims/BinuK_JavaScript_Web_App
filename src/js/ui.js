export class GameUI {
    constructor() {
        this.startBtn = document.getElementById('start-btn');
        this.playBtn = document.getElementById('play-btn');
        this.messageEl = document.getElementById('message');
        this.warMessageEl = document.getElementById('war-message');
        this.player1CardCount = document.querySelector('#player1 .card-count');
        this.player2CardCount = document.querySelector('#player2 .card-count');
        this.player1CardDisplay = document.getElementById('player1-card');
        this.player2CardDisplay = document.getElementById('player2-card');
        this.battleArea = document.getElementById('battle-area');
    }

    initialize(game) {
        this.startBtn.addEventListener('click', () => game.startGame());
        this.playBtn.addEventListener('click', () => game.playRound());
        this.toggleButtons(false); // Initial state - only start button enabled
    }

    resetUI() {
        this.messageEl.textContent = '';
        this.warMessageEl.textContent = '';
        this.player1CardDisplay.innerHTML = '';
        this.player2CardDisplay.innerHTML = '';
        this.battleArea.innerHTML = '';
    }

    toggleButtons(gameInProgress) {
        this.startBtn.disabled = gameInProgress;
        this.playBtn.disabled = !gameInProgress;
    }

    setMessage(message) {
        this.messageEl.textContent = message;
    }

    setWarMessage(message) {
        this.warMessageEl.textContent = message;
    }

    clearWarMessage() {
        this.warMessageEl.textContent = '';
    }

    updateCardCounts(player1Count, player2Count) {
        this.player1CardCount.textContent = `Cards: ${player1Count}`;
        this.player2CardCount.textContent = `Cards: ${player2Count}`;
    }

    displayCard(card, player) {
        const container = player === 'player1' ? this.player1CardDisplay : this.player2CardDisplay;
        container.innerHTML = '';
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.style.backgroundImage = `url(${card.image})`;
        container.appendChild(cardEl);
    }

    displayWarCards(player1Cards, player2Cards) {
        this.battleArea.innerHTML = '';
        
        const warContainer = document.createElement('div');
        warContainer.style.display = 'flex';
        warContainer.style.flexDirection = 'column';
        warContainer.style.alignItems = 'center';
        
        const label = document.createElement('div');
        label.textContent = 'War Cards (Face Down)';
        label.style.marginBottom = '10px';
        label.style.fontWeight = 'bold';
        warContainer.appendChild(label);
        
        const cardsRow = document.createElement('div');
        cardsRow.style.display = 'flex';
        
        // Player 1 war cards
        const player1WarContainer = document.createElement('div');
        player1WarContainer.style.margin = '0 10px';
        const player1Label = document.createElement('div');
        player1Label.textContent = 'Player 1';
        player1Label.style.textAlign = 'center';
        player1Label.style.marginBottom = '5px';
        player1WarContainer.appendChild(player1Label);
        
        for (let i = 0; i < player1Cards.length; i++) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.style.backgroundImage = 'url(https://deckofcardsapi.com/static/img/back.png)';
            cardEl.style.margin = '0 2px';
            player1WarContainer.appendChild(cardEl);
        }
        
        // Player 2 war cards
        const player2WarContainer = document.createElement('div');
        player2WarContainer.style.margin = '0 10px';
        const player2Label = document.createElement('div');
        player2Label.textContent = 'Player 2';
        player2Label.style.textAlign = 'center';
        player2Label.style.marginBottom = '5px';
        player2WarContainer.appendChild(player2Label);
        
        for (let i = 0; i < player2Cards.length; i++) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.style.backgroundImage = 'url(https://deckofcardsapi.com/static/img/back.png)';
            cardEl.style.margin = '0 2px';
            player2WarContainer.appendChild(cardEl);
        }
        
        cardsRow.appendChild(player1WarContainer);
        cardsRow.appendChild(player2WarContainer);
        warContainer.appendChild(cardsRow);
        this.battleArea.appendChild(warContainer);
    }
}