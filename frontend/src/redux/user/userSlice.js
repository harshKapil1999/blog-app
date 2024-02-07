import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        error: null,
        loading: false,
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
    },
})

export const { signInStart, signInSuccess, signInFailure, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;