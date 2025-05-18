import { WarGame } from './game.js';
import { GameUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new GameUI();
    const game = new WarGame(ui);
    
    ui.initialize(game);
});