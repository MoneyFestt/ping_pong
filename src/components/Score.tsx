import React from "react";
import styles from "../styles/Score.module.css";

type Props = {
  playerScore: number;
  aiScore: number;
};

const Score: React.FC<Props> = ({ playerScore, aiScore }) => {
  return (
    <div className={styles.score}>
      {playerScore} - {aiScore}
    </div>
  );
};

export default Score;
