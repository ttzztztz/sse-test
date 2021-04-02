import React, { useState } from "react";
import "./App.css";
import { calculateWinner } from "./algorithm";
import { clsx } from "./lib";

interface SquareProps {
  value: string;
  onClick: () => void;
  idx: number;
}

const Square = (props: SquareProps) => {
  const btnClassNames = ["square"];
  const { value } = props;

  if (value === "X") btnClassNames.push("square-x");
  else if (value === "O") btnClassNames.push("square-o");

  return (
    <button
      className={clsx(...btnClassNames, `btn-${props.idx}`)}
      title={`btn-${props.idx}`}
      onClick={props.onClick}
    >
      {value}
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
    return <Square idx={i} value={squares[i]} onClick={() => onClick(i)} />;
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
    const desc = move ? "回到轮次 #" + move : "回到游戏开始";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  console.log(gameState);
  let status = "";
  const statusClassNames: string[] = [];
  if (winner) {
    status = "赢家: " + winner;
    statusClassNames.push("winner-status");
  } else if (gameState.stepNumber === 9) {
    status = "平局";
    statusClassNames.push("tie-status");
  } else {
    status = "当前手: " + (gameState.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <h3 className={clsx(...statusClassNames)}>{status}</h3>
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div>
        <h3>游戏历史</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const App = () => {
  return <Game />;
};

export default App;
