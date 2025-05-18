export async function createNewDeck() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        if (!response.ok) {
            throw new Error('Failed to create new deck');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating new deck:', error);
        throw error;
    }
}

export async function drawCards(deckId, count) {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        if (!response.ok) {
            throw new Error('Failed to draw cards');
        }
        return await response.json();
    } catch (error) {
        console.error('Error drawing cards:', error);
        throw error;
    }
}