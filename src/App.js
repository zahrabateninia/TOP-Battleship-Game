export default App;
import React from 'react';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to Battleship</h1>
      <GameBoard />
    </div>
  );
};

export default App;
