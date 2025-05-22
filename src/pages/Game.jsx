import React, { useState, useEffect, useRef } from "react";
import Paddle from "../components/Paddle";
import Ball from "../components/Ball";
import Score from "../components/Score";
import styles from "../styles/App.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementPlayer, incrementAI } from "../features/score/scoreSlice";

function Game() {
  const [keyPressed, setKeyPressed] = useState({ up: false, down: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.score);
  const playerName = useSelector((state) => state.player.name);

  const playerPosRef = useRef(200);
  const aiPosRef = useRef(200);
  const ballPosRef = useRef({ x: 300, y: 200 });
  const ballSpeedRef = useRef({ dx: 3, dy: 3 });
  const animationRef = useRef();

  // клавіші
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") setKeyPressed((prev) => ({ ...prev, up: true }));
      if (e.key === "ArrowDown") setKeyPressed((prev) => ({ ...prev, down: true }));
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") setKeyPressed((prev) => ({ ...prev, up: false }));
      if (e.key === "ArrowDown") setKeyPressed((prev) => ({ ...prev, down: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // петля
  
  const loop = () => {
    // Рух гравця
    if (keyPressed.up) playerPosRef.current = Math.max(playerPosRef.current - 4, 0);
    if (keyPressed.down) playerPosRef.current = Math.min(playerPosRef.current + 4, 320);

    // Рух AI
    const ballY = ballPosRef.current.y;
    if (ballY < aiPosRef.current + 30) aiPosRef.current = Math.max(aiPosRef.current - 2.5, 0);
    if (ballY > aiPosRef.current + 50) aiPosRef.current = Math.min(aiPosRef.current + 2.5, 320);

    // Рух м'яча
    let { x, y } = ballPosRef.current;
    let { dx, dy } = ballSpeedRef.current;
    x += dx;
    y += dy;

    // Відскок від верху/низу
    if (y <= 0 || y >= 390) {
      dy = -dy;
      y = y <= 0 ? 1 : 389;
    }

    // Відскок від гравця
    if (x <= 20 && y >= playerPosRef.current && y <= playerPosRef.current + 80) {
      dx = -dx;
      x = 21;
      dx = Math.sign(dx) * Math.min(Math.abs(dx) * 1.1, 10);
    }

    // Відскок від AI
    if (x >= 570 && y >= aiPosRef.current && y <= aiPosRef.current + 80) {
      dx = -dx;
      x = 569;
      dx = Math.sign(dx) * Math.min(Math.abs(dx) * 1.1, 10);
    }

    // Гол
    if (x <= 0) {
      dispatch(incrementAI());
      resetBall();
    } else if (x >= 600) {
      dispatch(incrementPlayer());
      resetBall();
    } else {
      ballPosRef.current = { x, y };
      ballSpeedRef.current = { dx, dy };
    }

    animationRef.current = requestAnimationFrame(loop);
  };

  const resetBall = () => {
    ballPosRef.current = { x: 300, y: 200 };
    ballSpeedRef.current = {
      dx: Math.random() > 0.5 ? 3 : -3,
      dy: Math.random() > 0.5 ? 3 : -3,
    };
  };

  // Старт 
  useEffect(() => {
    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [keyPressed]); 

  // завершення гри
  useEffect(() => {
    if (score.player >= 3 || score.ai >= 3) {
      navigate("/result");
    }
  }, [score, navigate]);

  // Ререндер 
  const [, forceRender] = useState(0);
  useEffect(() => {
    const renderLoop = () => {
      forceRender((prev) => prev + 1);
      requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>
          Welcome, {playerName || "Player"}!
        </p>
      </div>
      <div className={styles.gameContainer}>
        <Score playerScore={score.player} aiScore={score.ai} />
        <Paddle position={playerPosRef.current} left={true} />
        <Paddle position={aiPosRef.current} left={false} />
        <Ball position={ballPosRef.current} />
      </div>
    </div>
  );
}

export default Game;
