import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";

// Fetch All Producers
export const getProducersAsync = createAsyncThunk(
  "producer/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/cast/producers`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch producers");
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Create Producer
export const createProducerAsync = createAsyncThunk(
  "producer/createProducer",
  async (producerData, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/cast/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...producerData,
          dob: producerData.dob.split("-").reverse().join("-"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create producer");
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Edit Producer
export const editProducerAsync = createAsyncThunk(
  "producer/editProducer",
  async ({ id, name, gender, dob, bio }, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/cast/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          gender,
          dob: dob.split("-").reverse().join("-"),
          bio,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update producer");
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Delete Producer
export const deleteProducerAsync = createAsyncThunk(
  "producer/deleteProducer",
  async (producerId, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/cast/delete/${producerId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete producer");
      return producerId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const producerSlice = createSlice({
  name: "producer",
  initialState: {
    producers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
      })
      .addCase(getProducersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProducerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProducerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.producers.push(action.payload);
      })
      .addCase(createProducerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editProducerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProducerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = state.producers.map((producer) =>
          producer._id === action.payload._id ? action.payload : producer
        );
      })
      .addCase(editProducerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProducerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProducerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = state.producers.filter(
          (producer) => producer._id !== action.payload
        );
      })
      .addCase(deleteProducerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllProducers = (state) => state.producer.producers;
export const selectProducerLoading = (state) => state.producer.loading;
export const selectProducerError = (state) => state.producer.error;

export default producerSlice.reducer;
