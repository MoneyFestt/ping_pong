import { createSlice } from "@reduxjs/toolkit";

interface ScoreState {
  player: number;
  ai: number;
}

const initialState: ScoreState = {
  player: 0,
  ai: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementPlayer: (state) => {
      state.player += 1;
    },
    incrementAI: (state) => {
      state.ai += 1;
    },
    resetScore: () => initialState,
  },
});

export const { incrementPlayer, incrementAI, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
