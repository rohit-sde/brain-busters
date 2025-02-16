import { createSlice } from "@reduxjs/toolkit";

// Types for the state

export interface gamestate {
  About: AboutPlayersState;
  Board: BoardSettingsState;
  Cards: CardsDataState;
  Theme: ITheme;
}

interface ITheme {
  state: string;
}

interface AboutPlayersState {
  NoOfPlayers: number;
  PlayersDetails: playerobject[];
  CurrentTurn: number;
}

interface BoardSettingsState {
  Cards: {
    TypeOfCards: string; // Assuming 'TypeOfCards' is a string, update if necessary
    GridSize: number;
  };
  isPlayStart: boolean;
  isResetGame: boolean;
}

interface PlayersScoreState {
  LeaderBoard: object[]; // Adjust the type of LeaderBoard if needed
}

interface CardsDataState {
  Cards: object[]; // Adjust the type of Cards if needed
  IsFlipped: number[];
  IsSolved: number[];
}

export interface playerobject {
  Score: number;
  character: string;
  gender: string;
  id: number;
  time: { min: number; sec: number };
  isInput: boolean;
  isLoading: boolean;
  playerName: string;
}

// About_Players Slice
const About_Players = createSlice({
  name: "About_Players",
  initialState: {
    NoOfPlayers: 0,
    PlayersDetails: [],
    CurrentTurn: 1,
  } as AboutPlayersState,
  reducers: {
    SetPlayerNum(state, action) {
      state.NoOfPlayers = action.payload;
      Array(action.payload)
        .fill(null)
        .map((_, i) => {
          state.PlayersDetails.push({
            id: i + 1,
            playerName: `Player ${i + 1}`,
            character: "",
            gender: Math.random() < 0.5 ? "M" : "F",
            Score: 0,
            time: { min: 5, sec: 30 },
            isInput: false,
            isLoading: true,
          });
        });
    },
    SetScore(state, action) {
      const playerId = action.payload;
      state.PlayersDetails = state.PlayersDetails.map((ply) => {
        if (ply.id === playerId) {
          return { ...ply, Score: ply.Score + 1 };
        }
        return ply;
      });
    },
    SetPlayerDetails(state, action) {
      state.PlayersDetails = action.payload;
    },
    updatePlayerDetails(state, action) {
      state.PlayersDetails[action.payload.id].playerName =
        action.payload.editedValue;
    },
    SetLeftTime(state, action) {
      console.log(action);
      const payload = action.payload;
      const playertime = state.PlayersDetails.findIndex(
        (player) => player.id == payload?.currentPlayerId
      );
      state.PlayersDetails[playertime].time = payload?.Time;
    },
    SetCurrentTurn(state) {
      if (state.NoOfPlayers === state.CurrentTurn) {
        state.CurrentTurn = 1;
        return;
      }
      state.CurrentTurn = state.CurrentTurn + 1;
    },
  },
});

// Board_Settings Slice
const Board_Settings = createSlice({
  name: "Board_Settings",
  initialState: {
    Cards: {
      TypeOfCards: "ABC",
      GridSize: 4,
    },
    isPlayStart: false,
    isResetGame: false,
  } as BoardSettingsState,
  reducers: {
    SetCards(state, action) {
      if (typeof action.payload == "number") {
        state.Cards.GridSize = action.payload;
        return;
      }
      state.Cards.TypeOfCards = action.payload;
    },
    SetIsPlayStart(state) {
      state.isPlayStart = !state.isPlayStart;
    },
    SetIsResetGame(state) {
      if (state.isPlayStart) {
        state.isResetGame = !state.isResetGame;
        state.isPlayStart = false;
      }
    },
  },
});

// Players_Score Slice
const Players_Score = createSlice({
  name: "Players_Score",
  initialState: {
    LeaderBoard: [],
  } as PlayersScoreState,
  reducers: {
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
    SetCards(state, action) {
      state.Cards.push(action.payload);
    },
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
  initialState: { state: "dark" },
  reducers: {
    SetTheme(state, action) {
      const updatedValue = action.payload;
      state.state = updatedValue.toString().toLowerCase();
    },
  },
});

// Export actions
export const {
  SetPlayerNum,
  SetPlayerDetails,
  updatePlayerDetails,
  SetLeftTime,
  SetScore,
  SetCurrentTurn,
} = About_Players.actions;
export const { SetIsPlayStart, SetIsResetGame, SetCards } =
  Board_Settings.actions;
export const { SetLeaderBoard } = Players_Score.actions;
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
