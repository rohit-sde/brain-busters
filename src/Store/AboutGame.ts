import { createSlice } from "@reduxjs/toolkit";

// Types for the state
interface AboutPlayersState {
  NoOfPlayers: number;
  PlayersDetails: playerobject[];
  TimeLeft: { [key: string]: number };
  CurrentTurn: number;
}

interface BoardSettingsState {
  Cards: {
    TypeOfCards: string; // Assuming 'TypeOfCards' is a string, update if necessary
    GridSize: number;
  };
  TimeForEachPlayer: number;
  IsPlayStart: boolean;
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

interface playerobject {
  Score: number;
  character: string;
  gender: string;
  id: number;
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
    TimeLeft: {},
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
            gender: "M",
            Score: 0,
            isInput: false,
            isLoading: true,
          });
        });
    },
    SetScore(state, action) {
      const playerId = action.payload;
      // console.log(state.PlayersDetails[playerId]?.Score, "Updated Score...");
      state.PlayersDetails = state.PlayersDetails.map((ply) => {
        if (ply.id === playerId) {
          return { ...ply, Score: ply.Score + 2 };
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
      const { Player, Time } = action.payload;
      state.TimeLeft[Player] = Time;
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
      GridSize: 8,
    },
    TimeForEachPlayer: 5,
    IsPlayStart: false,
    isResetGame: false,
  } as BoardSettingsState,
  reducers: {
    SetCards(state, action) {
      state.Cards = action.payload;
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
  initialState: { state: false },
  reducers: {
    SetTheme(state, action) {
      state.state = action.payload;
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
export const {
  SetIsPlayStart,
  SetIsResetGame,
  SetTimeForEachPlayer,
  SetCards,
} = Board_Settings.actions;
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
