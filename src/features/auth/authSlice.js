import { createSlice } from '@reduxjs/toolkit';
import getTokenRole from './../../functions/getTokenRole';
const initialState = {
    token: null,
    role: null,
    userId: null
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
        },
        setRole: (state, action) => {
            const { accessToken } = action.payload;
            //getTokenRole will return 'unknown' if error occured
            state.role = getTokenRole(accessToken);
        },
        resetRole: (state) => {
            state.role = null;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        resetUserId: (state) => {
            state.userId = null;
        }
    }
});
export const {
    setToken,
    resetToken,
    setRole,
    resetRole,
    setUserId,
    resetUserId
} = authSlice.actions;
export default authSlice;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectUserId = (state) => state.auth.userId;