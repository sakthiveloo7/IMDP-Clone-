import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";

// Async: Fetch all movies
export const fetchMoviesAsync = createAsyncThunk("movie/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/movie/all`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch movies");
    return data.data; 
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Async: Fetch all producers
export const fetchProducersAsync = createAsyncThunk("movie/fetchProducers", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/cast/producers`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch producers");
    return data.data; 
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Create Movie
export const createMovieAsync = createAsyncThunk("movie/create", async (movieData, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/movie/create`, {
      method: "POST",
      body: JSON.stringify(movieData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create movie");
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Edit Movie
export const editMovieAsync = createAsyncThunk("movie/edit", async (movieData, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/movie/edit/${movieData._id}`, {
      method: "PUT",
      body: JSON.stringify(movieData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to edit movie");
    return data.data; 
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Delete Movie
export const deleteMovieAsync = createAsyncThunk("movie/delete", async (movieId, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/movie/delete/${movieId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete movie");
    return movieId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    producers: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Producers
      .addCase(fetchProducersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload; 
      })
      .addCase(fetchProducersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Movie
      .addCase(createMovieAsync.fulfilled, (state, action) => {
        state.movies.push(action.payload); 
      })

      // Edit Movie
      .addCase(editMovieAsync.fulfilled, (state, action) => {
        state.movies = state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })

      // Delete Movie
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie._id !== action.payload);
      });
  },
});

export const selectAllMovies = (state) => state.movie.movies;
export const selectAllProducers = (state) => state.movie.producers; 
export const selectMovieLoading = (state) => state.movie.loading;
export const selectMovieError = (state) => state.movie.error;

export default movieSlice.reducer;
