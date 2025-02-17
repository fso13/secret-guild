import React from 'react';

const GameModal = ({ game, onClose }) => (
  <div className="modal">
    <h2>{game.title}</h2>
    <p>{game.description}</p>
    <button onClick={onClose}>Закрыть</button>
  </div>
);

export default GameModal;