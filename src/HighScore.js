import React from "react";

export default function Highscore({ recordTime, gameTime }) {
  return (
    <div>
      <div className="high-scores">
        {recordTime != gameTime && (
          <p>
            {recordTime} {recordTime && "seconds"}{" "}
          </p>
        )}
      </div>
    </div>
  );
}
