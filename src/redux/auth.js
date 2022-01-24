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
        }
    }
});

const { loginSuccess } = auth.actions;

export const login = token => dispatch => {
    dispatch(loginSuccess(token));
}

export const getToken = state => state.auth.token;

export default auth.reducer;