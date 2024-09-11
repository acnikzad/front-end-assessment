import { CardType } from "../types";

// showHint is a dense, custom hook that handles the behavior of the hint feature
// temporarily flips a random pair of unmatched cards for .5 seconds
// Filters out unmatched and unflipped cards, then randomly picks a pair to show
// isHinted is used to track if a card was shown during a hint
// When a hint is shown, isHinted: true is applied to both cards in the pair
// After .5 seconds, both cards are flipped back and isHinted is reset to false
// This allows cards return to their original state after being temporarily revealed
// Uses one hint, reducing hintsLeft by one

const useShowHint = (
  cards: CardType[],
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  hintsLeft: number,
  setHintsLeft: React.Dispatch<React.SetStateAction<number>>
) => {
  const showHint = () => {
    if (hintsLeft > 0) {
      const unmatchedCards = cards.filter(
        (card) => !card.matched && !card.isFlipped
      );

      const cardPairs = unmatchedCards.reduce((acc, card) => {
        if (!acc[card.name]) {
          acc[card.name] = [];
        }
        acc[card.name].push(card);
        return acc;
      }, {} as Record<string, CardType[]>);

      const availablePairs = Object.values(cardPairs).filter(
        (pair) => pair.length === 2
      );

      if (availablePairs.length > 0) {
        const randomPair =
          availablePairs[Math.floor(Math.random() * availablePairs.length)];

        const hintedCards = cards.map((card) =>
          randomPair.includes(card)
            ? { ...card, hinted: true, isFlipped: true }
            : card
        );
        setCards(hintedCards);
        setTimeout(() => {
          const resetCards = hintedCards.map((card) =>
            card.hinted ? { ...card, isFlipped: false, hinted: false } : card
          );
          setCards(resetCards);
        }, 500);

        setHintsLeft(hintsLeft - 1);
      }
    }
  };

  return showHint;
};

export default useShowHint;
