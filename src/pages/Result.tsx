import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MenuResult.module.css";
import { useSelector, useDispatch } from "react-redux";
import { resetScore } from "../features/score/scoreSlice";
import { RootState } from "../store"; // не забудь імпорт, якщо ще не є

const Result: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score);

  const handleRestart = () => {
    dispatch(resetScore());
    navigate("/game");
  };

  return (
    <div className={styles.centeredContainer}>
      <h2 className={styles.title}>Game Over</h2>
      <p>Player: {score.player}</p>
      <p>AI: {score.ai}</p>
      <button className={styles.button} onClick={handleRestart}>
        Play Again
      </button>
    </div>
  );
};

export default Result;
