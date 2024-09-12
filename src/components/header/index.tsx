import "./../../styles/header.css";

type HeaderProps = {
  resetGame: () => void;
  moves: number;
  score: number;
  time: number;
};

const Header: React.FC<HeaderProps> = ({ resetGame, moves, score, time }) => {
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
