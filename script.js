// Define the deck of cards
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const deck = [];
for (const suit of suits) {
  for (const rank of ranks) {
    deck.push({ rank, suit });
  }
}

// Shuffle the deck
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(deck);

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
