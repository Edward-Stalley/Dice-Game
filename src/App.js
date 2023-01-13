import React from "react";

import Die from "./Die";
import "./style.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import swal from "sweetalert";
import Question from "./Question.js";
import HighScores from "./HighScores";
import Highscore from "./HighScore";

// extra ideas
// track number of rolls

function App() {
  // make date
  // const date = new Date().getMilliseconds();

  // make random number
  function randomNumberCreator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // let randomNumber;

  //----------------------------- #method B (my original way)

  // const dice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // const diceElements = dice.map((die) => {
  //   randomNumber = randomNumberCreator(0, 6);
  //   return <Die key={`die ${die + date}  `} value={randomNumber} />;
  // });

  //--------------------------- #method A (teacher's way

  let random;

  const [dice, setDice] = React.useState(allNewDice());
  const [isHeld, setIsHeld] = React.useState(false);
  const [tenzies, setTenzies] = React.useState(false);

  function generateNewDie() {
    random = Math.ceil(Math.random() * 6);

    return {
      isHeld: false,
      value: random,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const diceEl = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  localStorage.clear();

  function roll() {
    counter == 0 && setCounter(gameTime);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === true ? die : generateNewDie();
      })
    );
  }

  // New Feature - save the best times to local storage
  // const storedTime = localStorage.getItem("recordTime");

  const [recordTime, setRecordTime] = React.useState(localStorage.getItem("recordTime"));
  localStorage.setItem("recordTime", recordTime);
  // localStorage.setItem("recordTime", recordTime);
  // setRecordTime(storedTime);
  //

  function endGame() {
    if (dice.every((die) => die.value === dice[0].value && die.isHeld === true)) {
      setTenzies(true);
      swal("Congratulations!");
      setRecordTime(gameTime - counter);
      localStorage.setItem("recordTime", recordTime);
    }
  }

  const [counter, setCounter] = React.useState("");
  const gameTime = 15;

  function newGame() {
    console.log("new game");
    setCounter(gameTime);
    setDice(allNewDice());
    setTenzies(false);
  }

  React.useEffect(() => {
    endGame();
  }, [dice]);

  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 2000);
    }
    if (counter === 0) {
      swal("Try Again");
    }
  }, [counter]);

  const [show, setShow] = React.useState("");

  function showInfo() {
    swal(
      "Roll until all dice are the same. Click on each die to freeze it at its current value between rolls. If you match all the numbers in the allotted time, you win!"
    );
  }

  function toggleShow() {
    setShow((prevShow) => !prevShow);
  }

  const [highScores, setHighScores] = React.useState([{ name: "Test Name", score: recordTime }]);

  return (
    <div className="game">
      <main className="container">
        {tenzies && <Confetti />}
        <div className="app-container">
          <div className="app">
            <div className="rules">
              <div className="header-info">
                {" "}
                <h2>Dice Game</h2>
                <Question handleClick={showInfo} toggle={toggleShow} />
              </div>
            </div>
            <div className="dice-container">{diceEl} </div>
            <div className="btn-timer">
              <button className="roll-btn" onClick={tenzies || counter === 0 ? newGame : roll}>
                {tenzies || counter === 0 ? "New Game" : "Roll"}
              </button>
              {!tenzies && <div className="timer">{counter}</div>}
            </div>
          </div>
          <HighScores highScores={highScores} recordTime={recordTime} gameTime={gameTime} />
        </div>
      </main>
    </div>
  );
}

export default App;
