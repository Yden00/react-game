import React from "react";
let gameBoard: number[][] = [];

function createBoard(): number[][] {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  Array.from({ length: 2 }, () => (Math.random() <= 0.7 ? 2 : 4)).forEach(
    (el) => {
      const { x, y } = generateRandomIndex(board);
      board[y][x] = el;
    }
  );
  return board;
}

gameBoard = createBoard();

function generateRandomIndex(board: number[][]): { x: number; y: number } {
  const indexes = {
    x: Math.floor(Math.random() * 4),
    y: Math.floor(Math.random() * 4),
  };
  return board[indexes.y][indexes.x] === 0
    ? indexes
    : generateRandomIndex(board);
}

function makeTurn(direction: string): void {
   
}
function moveUp(coordinate: { x: number; y: number }, gameBoard: number[][]){
  if(gameBoard[coordinate.y-1][coordinate.x] === 0){
    gameBoard[coordinate.y-1][coordinate.x] = gameBoard[coordinate.y][coordinate.x]
    gameBoard[coordinate.y][coordinate.x] = 0 
  } else return false
}
export default function Board() {
  function handleKeyPress({ key }: KeyboardEvent) {
    switch (key) {
      case "ArrowUp":
        makeTurn(key);
        break;
      case "ArrowDown":
        makeTurn(key);
        break;
      case "ArrowRight":
        makeTurn(key);
        break;
      case "ArrowLeft":
        makeTurn(key);
        break;
      default:
        break;
    }
  }
  window.addEventListener('keyup',handleKeyPress)
  return <div className="board" ></div>;
}
