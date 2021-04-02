const fs = require("fs");

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TEMPLATE = (test_case, res) => {
  return `[${JSON.stringify(test_case)},${res?.toString() ?? "null"}],\n`;
};

const ans = [];
const dfs = (state) => {
  if (state.length === 9) {
    ans.push(TEMPLATE(state, calculateWinner(state)));
    return;
  }

  ["X", "O", null].forEach((item) => {
    state.push(item);
    dfs(state);
    state.pop();
  });
};

dfs([]);
ans.forEach((cur) => fs.appendFileSync("./1.js", cur));
