import { BASE_URL } from './../../constants';
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import {
    setToken,
    setRole,
    setUserId
} from './../auth/authSlice';
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(
            typeof token === 'string'
            && token.length > 0
        ){
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include'//to manage cookies when using fetch()
});
const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions);
    if(
        typeof result?.error !== 'undefined'
        && result?.error?.data?.message === 'jwt expired'
    ){
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST'
            },
            api,
            extraOptions
        );
        if(typeof refreshResult?.data !== 'undefined'){
            const { data } = refreshResult;
            api.dispatch(setToken({accessToken: data.accessToken}));
            api.dispatch(setRole({accessToken: data.accessToken}));
            api.dispatch(setUserId(data.userId));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}
const api = createApi({
    baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Users', 'Tasks'],
    endpoints: () => ({})
});
export {
    api
};