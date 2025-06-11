import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";

// Async thunk: Get all actors
export const getActorsAsync = createAsyncThunk(
  "actor/getActors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cast/actors`);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to fetch actors");
      }
      return data.data; // Array of actors
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Create actor
export const createActorAsync = createAsyncThunk(
  "actor/createActor",
  async (actorData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cast/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actorData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Edit actor
export const editActorAsync = createAsyncThunk(
  "actor/editActor",
  async ({ actorId, actorData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/cast/edit/${actorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(actorData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Delete actor
export const deleteActorAsync = createAsyncThunk(
  "actor/deleteActor",
  async (actorId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/cast/delete/${actorId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get actors
    builder
      .addCase(getActorsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActorsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = action.payload;
      })
      .addCase(getActorsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create actor
    builder
      .addCase(createActorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createActorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.actors.push(action.payload);
      })
      .addCase(createActorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Edit actor
    builder
      .addCase(editActorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editActorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = state.actors.map((actor) =>
          actor._id === action.payload._id ? action.payload : actor
        );
      })
      .addCase(editActorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete actor
    builder
      .addCase(deleteActorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteActorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = state.actors.filter(
          (actor) => actor._id !== action.payload._id
        );
      })
      .addCase(deleteActorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = actorSlice.actions;
export default actorSlice.reducer;
