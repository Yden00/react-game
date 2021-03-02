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

function generateRandomCell(board: number[][]): any {
  const {x, y} = generateRandomIndex(gameBoard)
  return  board[y][x] === 0 ? board[y][x] = (Math.random() <= 0.7 ? 2 : 4) : generateRandomCell(board);
}


function makeTurn(direction: string): void {
    switch (direction) {
      case "ArrowUp":
        gameBoard = move(gameBoard, { vectorX: 0 , vectorY: -1})
        generateRandomCell(gameBoard)
        console.log(gameBoard)
        break;
      case "ArrowDown":
        gameBoard = move(gameBoard, { vectorX: 0 , vectorY: 1})
        generateRandomCell(gameBoard)
        console.log(gameBoard)
        break;
      case "ArrowRight":
        gameBoard = move(gameBoard, { vectorX: 1 , vectorY: 0})
        generateRandomCell(gameBoard)
        console.log(gameBoard)
        break;
      case "ArrowLeft":
        gameBoard = move(gameBoard, { vectorX: -1 , vectorY: 0})
        generateRandomCell(gameBoard)
        console.log(gameBoard)
        break;
      default:
        break;
    }
}
function move(gameBoard: number[][], direction:{ vectorY:number, vectorX: number }):number[][]{
  for (let x = 0; x <= 3; x++) {    
    for(let i= 0 ; i <= 3 ; i++){
      if(i + direction.vectorY >= 0){
        for (let j = 0; j <= 3; j++) {
          if(j + direction.vectorX >= 0){
          if(i + direction.vectorY <= 3 && gameBoard[i + direction.vectorY][j + direction.vectorX] === 0){
            gameBoard[i + direction.vectorY][j + direction.vectorX] = gameBoard[i][j]
           gameBoard[i][j] = 0 
          } else if (i + direction.vectorY <= 3 && gameBoard[i + direction.vectorY][j + direction.vectorX] === gameBoard[i][j]) {
            gameBoard[i + direction.vectorY][j + direction.vectorX] = gameBoard[i][j] * 2
           gameBoard[i][j] = 0 
          }
        }
      }
      }
      }
  }
  return gameBoard
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
  return <div className="board"></div>;
}
