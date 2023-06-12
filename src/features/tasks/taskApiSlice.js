import { api } from './../api/apiSlice';
const taskApiRoute = 'tasks';
const taskApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: taskApiRoute,
                method: 'GET'
            }),
            transformResponse: (response) => (
                response.tasks
            ),
            providesTags: (result) => {
                if(result){
                    return [
                        ...result.map(({_id}) =>
                            ({type: 'Tasks', id:_id})),
                        {type: 'Tasks', id: 'LIST'}
                    ];
                }else{
                    return [{type: 'Tasks', id: 'LIST'}];
                }
            }
        }),
        getTask: build.query({
            query: ({taskId}) => ({
                url: `${taskApiRoute}/${taskId}`,
                method: 'GET'
            }),
            transformResponse: (response) => (
                response.task
            )
        }),
        addTask: build.mutation({
            query: ({title, body}) => ({
                url: taskApiRoute,
                method: 'POST',
                body:{
                    title,
                    body
                }
            }),
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),
        updateTask: build.mutation({
            query: ({taskId, title, body, completed}) => ({
                url: `${taskApiRoute}/${taskId}`,
                method: 'PATCH',
                body: {
                    title,
                    body,
                    completed
                }
            }),
            invalidatesTags: (result, error, args) => (
                [{type: 'Tasks', id: args.taskId}]
            )
        }),
        deleteTask: build.mutation({
            query: ({taskId}) => ({
                url: `${taskApiRoute}/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        })
    })
})
export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = taskApi;