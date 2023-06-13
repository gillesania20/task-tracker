import { api } from './../api/apiSlice';
const userApiRoute = 'users';
const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: userApiRoute,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.users;
            },
            providesTags: (result) => {
                if(result){
                    return [
                        ...result.map(({_id}) =>
                            ({type: 'Users', id:_id})),
                        {type: 'Users', id: 'LIST'}
                    ];
                }else{
                    return [{type: 'Users', id: 'LIST'}];
                }
            }
        }),
        getUser: build.query({
            query: ({userId}) => ({
                url: `${userApiRoute}/${userId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.user;
            }
        }),
        addUser: build.mutation({
            query: ({username, password}) => ({
                url: userApiRoute,
                method: 'POST',
                body: {
                    username,
                    password
                }
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        updateUser: build.mutation({
            query: ({userId, username, password}) => ({
                url: `${userApiRoute}/${userId}`,
                method: 'PATCH',
                body: {
                    username,
                    password
                }
            }),
            invalidatesTags: (result, error, args) => (
                [{type: 'Users', id: args.userId}]
            )
        }),
        deleteUser: build.mutation({
            query: ({userId}) => ({
                url: `${userApiRoute}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        })
    })
});
export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;