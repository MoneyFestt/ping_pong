import React from "react";
import styles from "../styles/Paddle.module.css";

type PaddleProps = {
  position: number;
  left: boolean;
};

const Paddle: React.FC<PaddleProps> = ({ position, left }) => {
  return (
    <div
      className={styles.paddle}
      style={{
        top: `${position}px`,
        left: left ? "10px" : "580px",
      }}
    />
  );
};

export default Paddle;
