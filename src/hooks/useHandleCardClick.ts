import { CardType } from "../types";

// handleCardClick is a dense, custom hook that handles behavior when a card is clicked
// Flipped cards are added to an array: flippedCards
// If flippedCards contains a card, the next card flipped is compared
// If they are matched, both cards are updated to matched: true
// If not, both cards isFlipped: false after .5 seconds, matched remains false

const useHandleCardClick = (
  cards: CardType[],
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  flippedCards: CardType[],
  setFlippedCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  matchedCards: CardType[],
  setMatchedCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  moves: number,
  setMoves: React.Dispatch<React.SetStateAction<number>>,
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  displayGreeting: (greeting: string) => void
) => {
  const handleCardClick = (clickedCard: CardType) => {
    if (
      flippedCards.length < 2 &&
      !clickedCard.isFlipped &&
      !clickedCard.matched
    ) {
      const updatedCards = cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
      setFlippedCards([...flippedCards, clickedCard]);

      if (flippedCards.length === 1) {
        setMoves(moves + 1);
        const firstCard = flippedCards[0];

        if (firstCard.name === clickedCard.name) {
          const updatedMatchedCards = updatedCards.map((card) =>
            card.name === clickedCard.name ? { ...card, matched: true } : card
          );
          setCards(updatedMatchedCards);
          setMatchedCards([...matchedCards, firstCard, clickedCard]);
          setScore(score + 1);
          setFlippedCards([]);

          displayGreeting(clickedCard.greeting);
        } else {
          setTimeout(() => {
            const resetCards = updatedCards.map((card) =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, isFlipped: false }
                : card
            );
            setCards(resetCards);
            setFlippedCards([]);
          }, 500);
        }
      }
    }
  };

  return handleCardClick;
};

export default useHandleCardClick;
