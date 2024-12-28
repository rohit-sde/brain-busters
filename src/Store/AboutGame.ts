import { createSlice } from "@reduxjs/toolkit";

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
    NoOfPlayers: 0,
    PlayersDetails: [],
    TimeLeft: {},
    CurrentTurn: "",
  } as AboutPlayersState,
  reducers: {
    SetPlayerNum(state, action) {
      state.NoOfPlayers = action.payload;
    },
    SetPlayerDetails(state, action) {
      state.PlayersDetails.push(action.payload);
    },
    SetLeftTime(state, action) {
      const { Player, Time } = action.payload;
      state.TimeLeft[Player] = Time;
    },
    SetCurrentTurn(state, action) {
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
    SetTypeOfCards(state, action) {
      state.TypeOfCards = action.payload;
    },
    SetGridSize(state, action) {
      state.GridSize = action.payload;
    },
    SetTimeForEachPlayer(state, action) {
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
    SetScore(state, action) {
      const player = action.payload;
      if (state.Score[player]) {
        state.Score[player] += 1;
      } else {
        state.Score[player] = 1;
      }
    },
    SetLeaderBoard(state, action) {
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
    SetIsFlipped(state, action) {
      state.IsFlipped.push(action.payload);
    },
    SetIsSolved(state, action) {
      state.IsSolved.push(action.payload);
    },
  },
});

// Theme
const App_Theme = createSlice({
  name: "App_Theme",
  initialState: { state: false },
  reducers: {
    SetTheme(state, action) {
      state.state = action.payload;
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
export const { SetTheme } = App_Theme.actions;

// Export reducers
export default {
  About: About_Players.reducer,
  Board: Board_Settings.reducer,
  products: Players_Score.reducer,
  Cards: Cards_Data.reducer,
  Theme: App_Theme.reducer,
};
