import { api } from './../api/apiSlice';
import { setToken } from './authSlice';
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
            ) {
                try{
                    const {data} = await queryFulfilled;
                    const accessToken = data.accessToken;
                    dispatch(setToken({accessToken}));
                }catch(err){
                    //err
                }
            }
        }),
        refresh: build.mutation({
            query: () => ({
                url: `${authApiRoute}/refresh`,
                method: 'POST'
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: `${authApiRoute}/logout`,
                method: 'POST'
            })
        })
    })
})
export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation
} = authApi;