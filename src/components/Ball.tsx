import React from "react";
import styles from "../styles/Ball.module.css";

type Props = {
  position: {
    x: number;
    y: number;
  };
};

const Ball: React.FC<Props> = ({ position }) => {
  return (
    <div
      className={styles.ball}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
};

export default Ball;
