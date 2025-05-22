import { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState({ player: 0, ai: 0 });

  return (
    <GameContext.Provider value={{ score, setScore }}>
      {children}
    </GameContext.Provider>
  );
}
