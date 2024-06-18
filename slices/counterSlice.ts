import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    value: number
    listUsers: Array<Object>
}

const initialState: CounterState = {
    value: 0,
    listUsers: [],
}

export const counterSlice = createSlice ({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        initializeUserView: (state, action) => {
            state.listUsers = action.payload;
        },
    },
})

export const {increment, decrement, initializeUserView} = counterSlice.actions

export default counterSlice.reducer