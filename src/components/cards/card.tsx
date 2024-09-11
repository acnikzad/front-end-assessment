import React from "react";
import "./../../styles/card.css";

type CardProps = {
  id: number;
  content: JSX.Element | string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  backContent?: JSX.Element | string;
  className?: string;
};

// The Card component is a modular, reusable component used as an individual card in the game
// The cards behavior is based on the isFlipped and isMatched states
// The values displayed on the front and back of the card are passed in as props
const Card: React.FC<CardProps> = ({
  id,
  content,
  isFlipped,
  isMatched,
  onClick,
  backContent = "Back",
  className = "",
}) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      } ${className}`}
      onClick={onClick}
      id={`card-${id}`}
    >
      <div className="card-inner">
        <div className="card-back">{backContent}</div>
        <div className="card-front">{content}</div>
      </div>
    </div>
  );
};

export default Card;
