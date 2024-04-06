class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.calculateValue(rank);
    }
// I was talking with my Mentor and he discussed the prospect of running this within the system as a pure "numbers game"- this was helpful to me after discovering it was returning anything with strings as though they were ties
    calculateValue(rank) {
        if(rank === 'J') {
            return 11;
        } else if (rank === 'Q') {
            return 12;
        } else if (rank === 'K') {
            return 13;
        } else if (rank === 'A') {
            return 14;
        } else {
            return parseInt(rank);
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    addCard(card) {
        this.hand.push(card);
    }

    playCard() {
        return this.hand.shift();
    }

    addCards(cards) {
        this.hand.push(...cards);
    }

    getHandSize() {
        return this.hand.length;
    }
}

class WarGame {
    constructor() {
        this.deck = [];
        this.players = [new Player("Player 1"), new Player("Player 2")];
        this.initializeDeck();
        this.dealCards();
    }

    initializeDeck() {
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        

        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push(new Card(rank, suit));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealCards() {
        this.shuffleDeck();
        while (this.deck.length > 0) {
            for (let player of this.players) {
                player.addCard(this.deck.pop());
            }
        }
    }

    playRound() {
        const cardsInPlay = this.players.map(player => player.playCard());
        const [card1, card2] = cardsInPlay;
    
        console.log(`Player 1 plays: ${card1.rank} of ${card1.suit}`);
        console.log(`Player 2 plays: ${card2.rank} of ${card2.suit}`);
    
        if (card1.value > card2.value) {
            console.log("Player 1 wins the round!");
            this.players[0].addCards(cardsInPlay);
        } else if (card1.value < card2.value) {
            console.log("Player 2 wins the round!");
            this.players[1].addCards(cardsInPlay);
        } else {
            console.log("It's a tie!");
            // Don't add cards back to player[0]'s hand in case of a tie
            // Instead, they remain in the player's hand until a clear winner emerges
        }
    
        console.log(`Player 1 has ${this.players[0].getHandSize()} cards left.`);
        console.log(`Player 2 has ${this.players[1].getHandSize()} cards left.`);
    }

    play() {
        let round = 1;
        while (this.players.every(player => player.getHandSize() > 0)) {
            debugger;
            console.log(`Round ${round}:`);
            this.playRound();
            round++;
        }
        const winner = this.players[0].getHandSize() > 0 ? this.players[0].name : this.players[1].name;
        console.log(`${winner} wins the game!`);
    }
}

// Example usage:
const warGame = new WarGame();
// warGame.play();
