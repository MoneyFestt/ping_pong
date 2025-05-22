import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "../features/score/scoreSlice";
import playerReducer from "../features/player/playerSlice"; 

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    player: playerReducer, 
  },
});
