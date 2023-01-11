import React from "react";
import HighScore from "./HighScore";

export default function HighScores({ highScores, recordTime, gameTime }) {
  //   const [highScores, setHighScores] = React.useState([{ name: "", score: recordTime }]);

  const highScoresEl = highScores.map((record) => {
    return <HighScore name={record.name} highScores={highScores} recordTime={recordTime} gameTime={gameTime} />;
  });

  return (
    <div className="high-scores-container">
      <h2>High Score</h2>
      {highScoresEl}
    </div>
  );
}
