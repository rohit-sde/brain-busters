import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types for the state
interface AboutPlayersState {
  NoOfPlayers: number;
  PlayersDetails: object[];
  TimeLeft: { [key: string]: number };
  CurrentTurn: string;
}

interface BoardSettingsState {
  TypeOfCards: string; // Assuming 'TypeOfCards' is a string, update if necessary
  GridSize: number;
  TimeForEachPlayer: number;
  IsPlayStart: boolean;
  isResetGame: boolean;
}

interface PlayersScoreState {
  Score: { [key: string]: number };
  LeaderBoard: object[]; // Adjust the type of LeaderBoard if needed
}

interface CardsDataState {
  Cards: object[]; // Adjust the type of Cards if needed
  IsFlipped: number[];
  IsSolved: number[];
}

// About_Players Slice
const About_Players = createSlice({
  name: "About_Players",
  initialState: {
    NoOfPlayers: 1,
    PlayersDetails: [],
    TimeLeft: {},
    CurrentTurn: "",
  } as AboutPlayersState,
  reducers: {
    SetPlayerNum(state, action: PayloadAction<number>) {
      state.NoOfPlayers = action.payload;
    },
    SetPlayerDetails(state, action: PayloadAction<object>) {
      state.PlayersDetails.push(action.payload);
    },
    SetLeftTime(
      state,
      action: PayloadAction<{ Player: string; Time: number }>
    ) {
      const { Player, Time } = action.payload;
      state.TimeLeft[Player] = Time;
    },
    SetCurrentTurn(state, action: PayloadAction<string>) {
      state.CurrentTurn = action.payload;
    },
  },
});

// Board_Settings Slice
const Board_Settings = createSlice({
  name: "Board_Settings",
  initialState: {
    TypeOfCards: "Alphabet", // Assuming default is "Alphabet" string
    GridSize: 4,
    TimeForEachPlayer: 5,
    IsPlayStart: false,
    isResetGame: false,
  } as BoardSettingsState,
  reducers: {
    SetTypeOfCards(state, action: PayloadAction<string>) {
      state.TypeOfCards = action.payload;
    },
    SetGridSize(state, action: PayloadAction<number>) {
      state.GridSize = action.payload;
    },
    SetTimeForEachPlayer(state, action: PayloadAction<number>) {
      state.TimeForEachPlayer = action.payload;
    },
    SetIsPlayStart(state) {
      state.IsPlayStart = !state.IsPlayStart;
    },
    SetIsResetGame(state) {
      state.isResetGame = !state.isResetGame;
    },
  },
});

// Players_Score Slice
const Players_Score = createSlice({
  name: "Players_Score",
  initialState: {
    Score: {},
    LeaderBoard: [],
  } as PlayersScoreState,
  reducers: {
    SetScore(state, action: PayloadAction<string>) {
      const player = action.payload;
      if (state.Score[player]) {
        state.Score[player] += 1;
      } else {
        state.Score[player] = 1;
      }
    },
    SetLeaderBoard(state, action: PayloadAction<object>) {
      state.LeaderBoard.push(action.payload);
    },
  },
});

// Cards_Data Slice
const Cards_Data = createSlice({
  name: "Cards_Data",
  initialState: {
    Cards: [],
    IsFlipped: [],
    IsSolved: [],
  } as CardsDataState,
  reducers: {
    SetIsFlipped(state, action: PayloadAction<number>) {
      state.IsFlipped.push(action.payload);
    },
    SetIsSolved(state, action: PayloadAction<number>) {
      state.IsSolved.push(action.payload);
    },
  },
});

// Export actions
export const { SetPlayerNum, SetPlayerDetails, SetLeftTime, SetCurrentTurn } =
  About_Players.actions;
export const {
  SetGridSize,
  SetIsPlayStart,
  SetIsResetGame,
  SetTimeForEachPlayer,
  SetTypeOfCards,
} = Board_Settings.actions;
export const { SetLeaderBoard, SetScore } = Players_Score.actions;
export const { SetIsFlipped, SetIsSolved } = Cards_Data.actions;

// Export reducers
export default {
  About: About_Players.reducer,
  Board: Board_Settings.reducer,
  products: Players_Score.reducer,
  Cards: Cards_Data.reducer,
};
