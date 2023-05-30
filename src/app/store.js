import { api } from './../features/api/apiSlice';
const reducer = {
    [api.reducerPath]: api.reducer
};
const preloadedState = {
    users: [],
    tasks: [],
    token: ''
};
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
});
export default store;