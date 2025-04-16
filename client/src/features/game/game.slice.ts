/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GameFormValues } from "../../schema/admin/GameSchema";
import { GameService } from "../../services/admin/games.service";
import { getFullImageUrl } from "../../utils/imageUtils";

interface GameState {
  loading: boolean;
  error: string | null;
  success: boolean;
  games: any[];
  currentGame: any | null;
}

const initialState: GameState = {
  loading: false,
  error: null,
  success: false,
  games: [],
  currentGame: null,
};

export const createGame = createAsyncThunk(
  "game/createGame",
  async (gameData: GameFormValues, { rejectWithValue }) => {
    try {
      console.log("game data : ", gameData);
      const response = await GameService.createGame(gameData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllGames = createAsyncThunk(
  "game/fetchAllGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GameService.getAllGames();

      if (Array.isArray(response.data)) {
        const processedGames = response.data.map((game: any) => ({
          ...game,
          thumbnail: game.thumbnail?.publicUrl
            ? {
                ...game.thumbnail,
                publicUrl: getFullImageUrl(game.thumbnail.publicUrl),
              }
            : game.thumbnail,
        }));

        return processedGames;
      } else {
        const processedGame = {
          ...response.data,
          thumbnail: response.data.thumbnail?.publicUrl
            ? {
                ...response.data.thumbnail,
                publicUrl: getFullImageUrl(response.data.thumbnail.publicUrl),
              }
            : response.data.thumbnail,
        };

        return [processedGame];
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGame = createAsyncThunk(
  "game/updateGame",
  async (
    { gameId, gameData }: { gameId: string; gameData: GameFormValues },
    { rejectWithValue }
  ) => {
    try {
      const response = await GameService.updateGame(gameId, gameData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGame = createAsyncThunk(
  "game/deleteGame",
  async (gameId: string, { rejectWithValue }) => {
    try {
      const response = await GameService.deleteGame(gameId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGameState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearGames: (state) => {
      state.games = [];
    },
    clearCurrentGame: (state) => {
      state.currentGame = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(createGame.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Games
      .addCase(fetchAllGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchAllGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Game
      .addCase(updateGame.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateGame.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Game
      .addCase(deleteGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGame.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetGameState, clearGames, clearCurrentGame } =
  gameSlice.actions;
export default gameSlice.reducer;
