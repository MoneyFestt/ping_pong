import React from "react";
import styles from "../styles/Score.module.css";

function Score({ playerScore, aiScore }) {
  return (
    <div className={styles.score}>
      {playerScore} - {aiScore}
    </div>
  );
}

export default Score;
