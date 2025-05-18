## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/war-card-game.git
   cd war-card-game

2. **Install dependencies:**:
    ```bash
    npm install

3. **Start the Server**:
    ```bash
    npm run dev




### API Usage

```markdown
## API Usage

This project uses the [Deck of Cards API](https://deckofcardsapi.com/) with these endpoints:

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `https://deckofcardsapi.com/api/deck/new/shuffle/` | GET | Creates and shuffles a new deck |
| `https://deckofcardsapi.com/api/deck/:deck_id/draw/` | GET | Draws cards from specified deck |

### Implementation Details

```javascript
// Creating a new shuffled deck
const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
const data = await response.json();
const deckId = data.deck_id;

// Drawing cards
const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
const drawData = await drawResponse.json();
const cards = drawData.cards;