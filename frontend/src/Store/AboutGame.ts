import { createSlice } from "@reduxjs/toolkit";

// Types for the state

export interface gamestate {
  About: AboutPlayersState;
  Board: BoardSettingsState;
  Cards: CardsDataState;
  Winner: WinnerPlayer;
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

interface WinnerPlayer {
  Winner: boolean;
  WinnerPlayer: { WinnerName: ""; WinnerPic: "" };
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
      const payload = action.payload;
      const playertime = state.PlayersDetails.findIndex(
        (player) => player.id == payload?.currentPlayerId
      );
      if (playertime >= 0) {
        state.PlayersDetails[playertime].time = payload?.Time;
      }
      // state.PlayersDetails[playertime].time = payload?.Time;
    },
    SetCurrentTurn(state, action) {
      if (action.payload) {
        state.CurrentTurn = action.payload;
        return;
      }
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
      state.isPlayStart = true;
      state.isResetGame = false;
    },
    SetIsResetGame(state) {
      if (state.isPlayStart) {
        state.isResetGame = true;
        state.isPlayStart = false;
      }
    },
  },
});

// Players_Score Slice
const Winner_Player = createSlice({
  name: "Winner_Player",
  initialState: {
    Winner: false,
    WinnerPlayer: {
      WinnerName: "",
      WinnerPic: "",
    },
  } as WinnerPlayer,
  reducers: {
    SetWinner(state, action) {
      state.Winner = action.payload;
    },
    SetWinnerDetail(state, action) {
      state.WinnerPlayer = action.payload;
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
export const { SetWinner, SetWinnerDetail } = Winner_Player.actions;
export const { SetIsFlipped, SetIsSolved } = Cards_Data.actions;
export const { SetTheme } = App_Theme.actions;

// Export reducers
export default {
  About: About_Players.reducer,
  Board: Board_Settings.reducer,
  Winner: Winner_Player.reducer,
  Cards: Cards_Data.reducer,
  Theme: App_Theme.reducer,
};
