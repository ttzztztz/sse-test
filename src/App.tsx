import React, { useState } from "react";
import "./App.css";
import { calculateWinner } from "./algorithm";

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

interface BoardProps {
  onClick: (i: number) => void;
  squares: string[];
}

const Board = (props: BoardProps) => {
  const { onClick, squares } = props;
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

interface GameState {
  history: { squares: any[] }[];
  stepNumber: number;
  xIsNext: boolean;
}

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const history = gameState.history.slice(0, gameState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameState.xIsNext ? "X" : "O";
    setGameState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !gameState.xIsNext,
    });
  };

  const jumpTo = (step: number) => {
    setGameState({
      ...gameState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const current = gameState.history[gameState.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = gameState.history.map((_, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (gameState.xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const App = () => {
  return <Game />;
};

export default App;
