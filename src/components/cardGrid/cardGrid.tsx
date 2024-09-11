import React from "react";
import Card from "../cards/card";
import { CardType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faFlag, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./../../styles/cardGrid.css";

type CardGridProps = {
  cards: CardType[];
  handleCardClick: (card: CardType) => void;
  category: "cities" | "countries" | "continents";
};

//displays different icons depending on the category passed in
const getIcon = (category: "cities" | "countries" | "continents") => {
  switch (category) {
    case "cities":
      return <FontAwesomeIcon icon={faBuilding} />;
    case "countries":
      return <FontAwesomeIcon icon={faFlag} />;
    case "continents":
      return <FontAwesomeIcon icon={faGlobe} />;
    default:
      return null;
  }
};

// Card is a modular component where the font and back contents are agnostic to the specific data we are using. Any data can be input here.
// In this case, we are passing in icon, and card.name to display on the front (face down)
// On the back, we are passing in the Zicasso image.
const CardGrid: React.FC<CardGridProps> = ({
  cards,
  handleCardClick,
  category,
}) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          id={card.id}
          content={
            <>
              {getIcon(category)}
              <p>{card.name}</p>
            </>
          }
          isFlipped={card.isFlipped}
          isMatched={card.matched}
          onClick={() => handleCardClick(card)}
          backContent={
            <img
              className="card-back"
              src="/images/zicassoLogo.png"
              alt="Logo"
            />
          }
        />
      ))}
    </div>
  );
};

export default CardGrid;
