import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders current player", () => {
  render(<App />);
  const linkElement = screen.getByText(/当前手/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders game history", () => {
  render(<App />);
  const linkElement = screen.getByText(/游戏历史/i);
  expect(linkElement).toBeInTheDocument();
});

test("game interactive #1", () => {
  render(<App />);
  const btnElement = screen.getByTitle(`btn-1`);
  fireEvent.click(btnElement);
  expect(btnElement.innerHTML.trim() === "X").toBeTruthy();
});

test("game interactive #2", () => {
  render(<App />);
  const btnElement1 = screen.getByTitle(`btn-1`);
  fireEvent.click(btnElement1);
  const btnElement2 = screen.getByTitle(`btn-2`);
  fireEvent.click(btnElement2);

  expect(btnElement1.innerHTML.trim() === "X").toBeTruthy();
  expect(btnElement2.innerHTML.trim() === "O").toBeTruthy();
});
