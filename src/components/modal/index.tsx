import React from "react";
import "./../../styles/modal.css";

type ModalProps = {
  show: boolean;
  score: number;
  onClose: () => void;
  onReset: () => void;
};

//This modal displays the final score of the game, and offers the user to reset the game or close the modal

const Modal: React.FC<ModalProps> = ({ show, score, onClose, onReset }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Congratulations!</h2>
        <p>Your final score is: {score}</p>
        <div className="modal-buttons">
          <button className="modal-button play-again" onClick={onReset}>
            Play Again
          </button>
          <button className="modal-button close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
