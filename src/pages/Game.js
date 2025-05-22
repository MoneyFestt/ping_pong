import React, { useState, useEffect } from "react";
import Paddle from "../components/Paddle";
import Ball from "../components/Ball";
import Score from "../components/Score";
import styles from "../styles/App.module.css";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementPlayer, incrementAI } from "../features/score/scoreSlice";



function Game() {
  const [playerPosition, setPlayerPosition] = useState(200);
  const [aiPosition, setAiPosition] = useState(200);
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 200 });
  const [ballSpeed, setBallSpeed] = useState({ dx: 3, dy: 3 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.score);
  const playerName = useSelector((state) => state.player.name);



  // Обробка руху ракетки гравця
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" && playerPosition > 0) {
        setPlayerPosition((prev) => prev - 20);
      } else if (e.key === "ArrowDown" && playerPosition < 320) {
        setPlayerPosition((prev) => prev + 20);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition]);

  // Логіка руху м'яча
  useEffect(() => {
    const moveBall = () => {
      setBallPosition((prev) => ({
        x: prev.x + ballSpeed.dx,
        y: prev.y + ballSpeed.dy,
      }));
  
      // Відбивання від верхньої та нижньої стінки
      if (ballPosition.y <= 0 || ballPosition.y >= 390) {
        setBallSpeed((prev) => ({ ...prev, dy: -prev.dy })); // Інверсія напрямку
        setBallPosition((prev) => ({
          ...prev,
          y: prev.y <= 0 ? 1 : 389, // Щоб не застрявав
        }));
      }
  
      // Відбивання від лівої ракетки (гравця)
      if (
        ballPosition.x <= 20 &&
        ballPosition.y >= playerPosition &&
        ballPosition.y <= playerPosition + 80
      ) {
        setBallSpeed((prev) => ({ ...prev, dx: -prev.dx }));
        setBallPosition((prev) => ({ ...prev, x: 21 })); // Відсуваємо м'ячик, щоб не застряг
      }
  
      // Відбивання від правої ракетки (AI)
      if (
        ballPosition.x >= 570 &&
        ballPosition.y >= aiPosition &&
        ballPosition.y <= aiPosition + 80
      ) {
        setBallSpeed((prev) => ({ ...prev, dx: -prev.dx }));
        setBallPosition((prev) => ({ ...prev, x: 569 }));
      }
  
      // Голи
      if (ballPosition.x <= 0) {
        dispatch(incrementAI());
        resetBall();
      } else if (ballPosition.x >= 600) {
        dispatch(incrementPlayer());
        resetBall();
      }
    };
  
    const interval = setInterval(moveBall, 30);
    return () => clearInterval(interval);
  }, [ballPosition, ballSpeed, playerPosition, aiPosition]);
  

  // Рух AI (простий алгоритм)
  useEffect(() => {
    const moveAI = () => {
      const aiSpeed = 2.5; // Швидкість руху AI
  
      if (ballPosition.y < aiPosition + 30) {
        setAiPosition((prev) => Math.max(prev - aiSpeed, 0)); // Рух вгору
      } else if (ballPosition.y > aiPosition + 50) {
        setAiPosition((prev) => Math.min(prev + aiSpeed, 320)); // Рух вниз
      }
    };
  
    const interval = setInterval(moveAI, 30);
    return () => clearInterval(interval);
  }, [ballPosition, aiPosition]);
  
  useEffect(() => {
    // Якщо м'яч торкається ракетки гравця
    if (
      ballPosition.x <= 20 && // Ліва сторона
      ballPosition.y >= playerPosition &&
      ballPosition.y <= playerPosition + 80
    ) {
      setBallSpeed((prev) => ({
        dx: Math.min(prev.dx * 1.1, 10), // Прискорюємо м'яч
        dy: prev.dy,
      }));
    }
  
    // Якщо м'яч торкається ракетки AI
    if (
      ballPosition.x >= 570 && // Права сторона
      ballPosition.y >= aiPosition &&
      ballPosition.y <= aiPosition + 80
    ) {
      setBallSpeed((prev) => ({
        dx: Math.min(prev.dx * 1.1, 10), // Прискорюємо м'яч
        dy: prev.dy,
      }));
    }
  }, [ballPosition, playerPosition, aiPosition]);
  
  
    useEffect(() => {
        if (score.player >= 3 || score.ai >= 3) {
            navigate("/result");
        }
    }, [score, navigate]);


  const resetBall = () => {
    setBallPosition({ x: 300, y: 200 });
    setBallSpeed({ dx: Math.random() > 0.5 ? 3 : -3, dy: Math.random() > 0.5 ? 3 : -3 });
  };

  return (
  <div>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>
        Welcome, {playerName || "Player"}!
      </p>
    </div>

    <div className={styles.gameContainer}>
      <Score playerScore={score.player} aiScore={score.ai} />
      <Paddle position={playerPosition} left={true} />
      <Paddle position={aiPosition} left={false} />
      <Ball position={ballPosition} />
    </div>
  </div>
);

}

export default Game;

