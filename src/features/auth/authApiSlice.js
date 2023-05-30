import { api } from './../api/apiSlice';
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
            })
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