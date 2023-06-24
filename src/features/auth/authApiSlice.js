import { api } from './../api/apiSlice';
import {
    setToken,
    setRole,
    setUserId,
    resetToken,
    resetRole,
    resetUserId
} from './authSlice';
const authApiRoute = 'auth';
const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({username, password}) => ({
                url: `${authApiRoute}/login`,
                method: 'POST',
                body: {
                    username,
                    password
                }
            }),
            async onQueryStarted(
                {username, password},
                { dispatch, queryFulfilled }
            ){
                try{
                    const {data} = await queryFulfilled;
                    const accessToken = data.accessToken;
                    dispatch(setToken({accessToken}));
                    dispatch(setRole({accessToken}));
                }catch(err){
                    //error
                }
            }
        }),
        refresh: build.mutation({
            query: () => ({
                url: `${authApiRoute}/refresh`,
                method: 'POST'
            }),
            async onQueryStarted(
                args,
                { dispatch, queryFulfilled }
            ){
                try{
                    const {data} = await queryFulfilled;
                    const accessToken = data.accessToken;
                    dispatch(setToken({accessToken}));
                    dispatch(setRole({accessToken}));
                    dispatch(setUserId(data.userId));
                }catch(err){
                    //error
                }
            }
        }),
        logout: build.mutation({
            query: () => ({
                url: `${authApiRoute}/logout`,
                method: 'POST'
            }),
            async onQueryStarted(
                args,
                { dispatch, queryFulfilled }
            ){
                try{
                    await queryFulfilled;
                    dispatch(resetToken());
                    dispatch(resetRole());
                    dispatch(resetUserId());
                }catch(err){
                    //err
                }
            }
        })
    })
});
export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation
} = authApi;