
class Card {
    constructor(rank,suit) {
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck{
    constructor() {
    this.cards=[];
    this.createDeck();
    }
    
    createDeck() {
    const suits =['of Hearts', 'of Diamonds', 'of Spades', 'of Clubs'];
    const ranks =[2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    
    for(let suit of suits){
    for (let rank of ranks){
    this.cards.push(new Card(rank, suit));}
        }
    }
}

class Player {
    constructor(num) {
        this.name = `Player${num}`;
        this.score = 0;
        this.hand = [];
    }
}

class Game {
    constructor() {
        this.deck = [];
        this.winner = null; //when a winner is selected, define it here
        this.players = []; //array of 2 players;
        this.makeDeck();
        this.dealCards();
        this.playGame();
    }

    makeDeck() {
        console.log("makeDeck()")
        //create a deck of 13 ranks, 4 suits and 52 cards    
        let ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
        let suits = ['❤️','🗡️','🍀','💎'];
    
        for (let suit of suits) {
            for (let x = 0; x < ranks.length; x++) {
                let card = new Card(ranks[x],suit);
                this.deck.push(card);
            }
        }
    
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    
    }

    dealCards() {
        console.log("dealCards()")
        //needs to give 26 cards to each player

        for (let x = 1; x <= 2; x++) {
            let player = new Player(x);
            player.hand = this.deck.splice(0,26);
            this.players.push(player);
        }

        //deal this.deck [] to each player
    }

    playGame() {
        console.log("playGame()")
        for (let player of this.players) {
            console.log(`Welcome to the game ${player.name}`)
        }
    }
}

let war = new Game();
war.playGame()
console.log(war);
    
console.log(suits)
console.log(ranks)
console.log(Card)

const warDeck = new Deck
// let deck = []
// Deal cards to players
const player1Deck = deck.slice(0, deck.length / 2);
// Pretty sure this is wrong
const player2Deck = deck.slice(deck.length / 2); 

// Game logic
while (player1Deck.length > 0 && player2Deck.length > 0) {
  const card1 = player1Deck.shift();
  const card2 = player2Deck.shift();

  if (ranks.indexOf(card1.rank) > ranks.indexOf(card2.rank)) {
    player1Deck.push(card1, card2);
  } else if (ranks.indexOf(card1.rank) < ranks.indexOf(card2.rank)) {
    player2Deck.push(card1, card2);
  } else {
    // War
    const warCards = [card1, card2];
    for (let i = 0; i < 3; i++) {
      warCards.push(player1Deck.shift(), player2Deck.shift());
    }
    const winnerCard1 = player1Deck.shift();
    const winnerCard2 = player2Deck.shift();

    if (ranks.indexOf(winnerCard1.rank) > ranks.indexOf(winnerCard2.rank)) {
      player1Deck.push(...warCards, winnerCard1, winnerCard2);
    } else {
      player2Deck.push(...warCards, winnerCard1, winnerCard2);
    }
  }
}

// Determine the winner
if (player1Deck.length === 0) {
  console.log("Player 2 wins!");
} else {
  console.log("Player 1 wins!");
}
