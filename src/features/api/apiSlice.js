import { BASE_URL } from './../../constants';
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Users', 'Tasks'],
    endpoints: () => ({})
});
export {
    api
};