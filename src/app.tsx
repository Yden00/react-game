import "./app.css";
import './index.css';
import React, {useState} from "react";
import Board from "./components/board";

export default function App() {
  const [score, setScore] = useState(0)

  const handleClickRestart = () => {
    
  }

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
          <button onClick={handleClickRestart}className="restart-btn">New Game</button>
        </div>
      </header>
      {/* setScore = {setScore} */}
      <Board  />
      <p className="explanation">
        <b>HOW TO PLAY: </b>
        Use your <b>arrow keys</b> to move the tiles. When two tiles with the
        same number touch, they <b>merge into one!</b>
      </p>
      <footer>
        <img className="logo" src="/assets/rs_school_js.svg" alt="logo" />
        <a href="https://rs.school/js/">RSSchool</a>
        <div className="info">
          <a href="https://github.com/ue4prog">My github account</a>
          <p>2021</p>
        </div>
      </footer>
    </div>
  );
}
