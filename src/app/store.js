const reducer = {
    users: usersReducer
};
const preloadedState = {
    users: [
        {
            username: 'userone'
        }
    ]
};
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
});