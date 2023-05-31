import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    token: null
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setToken: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        resetToken: (state) => {
            state.token = null;
        }
    }
});
export const {
    setToken,
    resetToken
} = authSlice.actions;
export default authSlice;