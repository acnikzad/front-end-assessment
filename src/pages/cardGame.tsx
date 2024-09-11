import React, { useState, useEffect } from "react";
import CardGrid from "../components/cardGrid/cardGrid";
import Header from "../components/header";
import Modal from "../components/modal";
import { CardType } from "../types";
import useHandleCardClick from "../hooks/useHandleCardClick";
import useShowHint from "../hooks/useShowHint";
import "./../styles/cardGame.css";

//Initializes the cards
const initializeCards = (
  type: "cities" | "countries" | "continents"
): CardType[] => {
  const cardData = {
    cities: [
      { name: "San Francisco", greeting: "Good job!" },
      { name: "Puerto Vallarta", greeting: "¡Buen trabajo!" },
      { name: "Vancouver", greeting: "Good job, eh!" },
      { name: "Taipei", greeting: "做得好!" },
      { name: "Kyoto", greeting: "よくやった!" },
      { name: "Rome", greeting: "Ben fatto!" },
      { name: "Amsterdam", greeting: "Goed gedaan!" },
      { name: "Stavanger", greeting: "Bra jobba!" },
      { name: "Barcelona", greeting: "¡Buen trabajo!" },
      { name: "La Fortuna", greeting: "¡Bien hecho!" },
    ],
    countries: [
      { name: "United States", greeting: "Good job!" },
      { name: "Mexico", greeting: "¡Buen trabajo!" },
      { name: "Canada", greeting: "Good job, eh!" },
      { name: "Taiwan", greeting: "做得好!" },
      { name: "Japan", greeting: "よくやった!" },
      { name: "Italy", greeting: "Ben fatto!" },
      { name: "Netherlands", greeting: "Goed gedaan!" },
      { name: "Norway", greeting: "Bra jobba!" },
      { name: "Spain", greeting: "¡Buen trabajo!" },
      { name: "Costa Rica", greeting: "¡Bien hecho!" },
    ],
    continents: [
      { name: "North America", greeting: "Good job!" },
      { name: "South America", greeting: "¡Buen trabajo!" },
      { name: "Asia", greeting: "干得好!" },
      { name: "Europe", greeting: "Bien joué!" },
      { name: "Africa", greeting: "Well done!" },
      { name: "Australia", greeting: "Well done!" },
      { name: "Antarctica", greeting: "Good job!" },
    ],
  };

  const selectedData = cardData[type];

  //Face down cards consist of a set of two, and unique ids for each
  let cards: CardType[] = selectedData.flatMap((item, index) => [
    {
      id: index * 2,
      name: item.name,
      greeting: item.greeting,
      isFlipped: false,
      matched: false,
    },
    {
      id: index * 2 + 1,
      name: item.name,
      greeting: item.greeting,
      isFlipped: false,
      matched: false,
    },
  ]);

  return shuffleArray(cards);
};

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const CardGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(initializeCards("cities"));
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [hintsLeft, setHintsLeft] = useState<number>(3);
  const [category, setCategory] = useState<
    "cities" | "countries" | "continents"
  >("cities");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showModal) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showModal]);

  // This useEffect keeps the score updated in real time in the dom
  // Calculates the score based on time, moves, and hints left
  // Once the game is over and showModal is true, the score is locked and displayed
  useEffect(() => {
    const calculateScore = () => {
      const timePenalty = Math.max(500 - time, 0);
      const movePenalty = moves * 10;
      const hintBonus = hintsLeft * 100;
      return Math.max(0, 1000 - movePenalty + timePenalty + hintBonus);
    };

    if (!showModal) {
      setScore(calculateScore());
    }
  }, [moves, time, hintsLeft, matchedCards, showModal]);

  useEffect(() => {
    resetGame();
  }, [category]);

  //This useEffect determines if all the cards have been matched to end the game
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setShowModal(true);
    }
  }, [matchedCards]);

  // displayGreeting temporarily shows a greeting message on the screen
  // It displays the greeting text and removes it after 2 seconds
  const displayGreeting = (greeting: string) => {
    const greetingElement = document.createElement("div");
    greetingElement.className = "greeting-flash";
    greetingElement.textContent = greeting;
    document.body.appendChild(greetingElement);

    setTimeout(() => {
      greetingElement.remove();
    }, 2000);
  };

  // Custom reusable hook to handle the card click behavior
  const handleCardClick = useHandleCardClick(
    cards,
    setCards,
    flippedCards,
    setFlippedCards,
    matchedCards,
    setMatchedCards,
    moves,
    setMoves,
    score,
    setScore,
    displayGreeting
  );

  // Custom reusable hook to handle the showHint behavior
  const showHint = useShowHint(cards, setCards, hintsLeft, setHintsLeft);

  const resetGame = () => {
    setCards(initializeCards(category));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
    setHintsLeft(3);
    setTime(0);
    setShowModal(false);
  };

  return (
    <div>
      <Header resetGame={resetGame} moves={moves} score={score} />
      <div>
        <label htmlFor="category">Choose a category: </label>
        <select
          id="category"
          onChange={(e) => {
            const selectedCategory = e.target.value as
              | "cities"
              | "countries"
              | "continents";
            setCategory(selectedCategory);
            setCards(initializeCards(selectedCategory));
          }}
        >
          <option value="cities">Cities</option>
          <option value="countries">Countries</option>
          <option value="continents">Continents</option>
        </select>
      </div>
      <div>
        <button onClick={showHint} disabled={hintsLeft === 0}>
          Show Hint ({hintsLeft} left)
        </button>
      </div>
      <CardGrid
        cards={cards}
        handleCardClick={handleCardClick}
        category={category}
      />
      <Modal
        show={showModal}
        score={score}
        onClose={() => setShowModal(false)}
        onReset={resetGame}
      />
    </div>
  );
};

export default CardGame;
