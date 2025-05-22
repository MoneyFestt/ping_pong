
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/MenuResult.module.css";
import { useSelector, useDispatch } from "react-redux";
import { resetScore } from "../features/score/scoreSlice";

function Result() {
  const navigate = useNavigate();
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();

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
}

export default Result;
