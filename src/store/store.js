import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice.js'
import producerReducer from '../slice/producerSlice.js'
import movieReducer from '../slice/movieSlice.js'
import actorReducer from '../slice/actorSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        producer: producerReducer,
        movie: movieReducer,
        actor: actorReducer,
    },
});