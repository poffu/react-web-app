import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
        },
        clearSuccess(state) {
            state.token = undefined;
        }
    }
});

const { loginSuccess } = auth.actions;

const { clearSuccess } = auth.actions;

export const login = token => dispatch => {
    dispatch(loginSuccess(token));
}

export const clearToken = token => dispatch => {
    dispatch(clearSuccess(token));
}

export const getToken = state => state.auth.token;

export default auth.reducer;