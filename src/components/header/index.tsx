import React, { useState, useEffect } from "react";
import "./../../styles/header.css";

type HeaderProps = {
  resetGame: () => void;
  moves: number;
  score: number;
};

const Header: React.FC<HeaderProps> = ({ resetGame, moves, score }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <header className="header">
      <div className="logo">
        <h1>Flip Trip</h1>
        <p>
          Time: {time}s | Moves: {moves} | Score: {score}
        </p>
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </header>
  );
};

export default Header;
