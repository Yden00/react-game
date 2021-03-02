import React, { useState, useEffect } from "react";

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
  const { x, y } = generateRandomIndex(board);
  if (board[y][x] === 0) {
    board[y][x] = Math.random() <= 0.7 ? 2 : 4;
    return board;
  } else {
    generateRandomCell(board);
  }
}

export default function Board() {
  const [board, onChangeBoard] = useState(createBoard());

  const move = (
    gameBoard: number[][],
    direction: { vectorY: number; vectorX: number }
  ): number[][] => {
    const newBoard = [...gameBoard];
    for (let x = 0; x <= 3; x++) {
      for (let i = 0; i <= 3; i++) {
        if (i + direction.vectorY >= 0) {
          for (let j = 0; j <= 3; j++) {
            if (j + direction.vectorX >= 0) {
              if (
                i + direction.vectorY <= 3 &&
                newBoard[i + direction.vectorY][j + direction.vectorX] === 0
              ) {
                newBoard[i + direction.vectorY][j + direction.vectorX] =
                  newBoard[i][j];
                newBoard[i][j] = 0;
              } else if (
                i + direction.vectorY <= 3 &&
                newBoard[i + direction.vectorY][j + direction.vectorX] ===
                  newBoard[i][j]
              ) {
                newBoard[i + direction.vectorY][j + direction.vectorX] =
                  newBoard[i][j] * 2;
                newBoard[i][j] = 0;
              }
            }
          }
        }
      }
    }
    return  generateRandomCell([...newBoard]);
  };
  const makeTurn = (direction: string): void => {
    switch (direction) {
      case "ArrowUp":
        onChangeBoard(move(board, { vectorX: 0, vectorY: -1 }));
        break;
      case "ArrowDown":
        onChangeBoard(move(board, { vectorX: 0, vectorY: 1 }));
        break;
      case "ArrowRight":
        onChangeBoard(move(board, { vectorX: 1, vectorY: 0 }));
        break;
      case "ArrowLeft":
        onChangeBoard(move(board, { vectorX: -1, vectorY: 0 }));
        break;
      default:
        break;
    }
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
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
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, []);

  return (
    <div className="board">
      {board.map((elem, index) =>
        elem.map((el, childIndex) => {
          return el === 0 ? (
            <div key={`${index}-${childIndex}`} className="cell empty"></div>
          ) : (
            <div key={`${index}-${childIndex}`} className="cell tile">
              {el}
            </div>
          );
        })
      )}
    </div>
  );
}
