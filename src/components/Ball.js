import React from "react";
import styles from "../styles/Ball.module.css";

function Ball({ position }) {
  return (
    <div
      className={styles.ball}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
}

export default Ball;
