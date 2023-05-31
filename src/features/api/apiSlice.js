import { BASE_URL } from './../../constants';
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().token;
            if(
                typeof token === 'string'
                || token.length > 0
            ){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Users', 'Tasks'],
    endpoints: () => ({})
});
export {
    api
};