import "./app.css";
import './index.css';
import React, {useEffect, useState, useRef} from "react";
import Board from "./components/board";
// @ts-ignore
import isEqual from 'lodash/isEqual';

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

function generateRandomIndex(board: number[][]): any {
  if(board.flat().find(el => el === 0) === 0){
    const indexes = {
      x: Math.floor(Math.random() * 4),
      y: Math.floor(Math.random() * 4),
    };
    if(board[indexes.y][indexes.x] === 0){
      return indexes
    } 
    else return generateRandomIndex(board);
  }
}
function usePrevious(value:number[][]) {
  const ref = useRef({});
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function App() {
  const [score, setScore] = useState(0)
  const [board, setBoard] = useState(createBoard());

  const prevBoard = usePrevious(board)
  useEffect(()=>{
    console.log(board,prevBoard)
    if (isEqual(board,prevBoard)) {
      
    }
  },[board,prevBoard])
  return (
    <div className="app">
      <header>
        <div className="title-container">
          <h1>2048</h1>
          <div className="score-container">Score<p>{score}</p></div>
        </div>
        <div className="intro-container">
          <div>
            <h2 className="subtitle">Play 2048 Game</h2>
            Join the numbers and get to the <b>2048 tile!</b>
          </div>
          <button onClick={()=>{setScore(0);setBoard(createBoard())}} className="restart-btn">New Game</button>
        </div>
      </header>
      <Board setScore={setScore}
        board={board}
        setBoard={setBoard}/>
      <p className="explanation">
        <b>HOW TO PLAY: </b>
        Use your <b>arrow keys</b> to move the tiles. When two tiles with the
        same number touch, they <b>merge into one!</b>
      </p>
      <footer>
        <a href="https://rs.school/js/">RSSchool</a>
        <div className="info">
          <a href="https://github.com/ue4prog">My github account</a>
          <p>2021</p>
        </div>
      </footer>
    </div>
  );
}
