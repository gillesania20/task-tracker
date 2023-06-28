import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateTaskMutation, useCheckTaskMutation } from './../../features/tasks/taskApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const EditTaskForm = ({data}) => {
    const { taskId } = useParams();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [completed, setCompleted] = useState(data.completed);
    const [updateTask, { isLoading }] = useUpdateTaskMutation();
    const [checkTask, { isLoading: isLoadingCheckTask }] = useCheckTaskMutation();
    const [refresh, { isLoading: isLoadingRefresh}] = useRefreshMutation();
    const navigate = useNavigate();
    const onChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else if(e.target.name === 'body'){
            setBody(e.target.value);
        }else if(e.target.name === 'completed'){
            setCompleted(!completed);
        }
        return null;
    }
    const onClickCancel = (cancelId) => {
        navigate(`/dash/tasks/display-task/${cancelId}`);
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const update = {};
        const latestTaskInfoResponse = await checkTask({taskId})
        if(latestTaskInfoResponse.data?.message === 'display task'){
            const refreshResponse = await refresh();
            if(refreshResponse.data?.message === 'successful token refresh'){
                update.taskId = taskId;
                if(title !== latestTaskInfoResponse.data.task.title){
                    update.title = title;
                }
                if(body !== latestTaskInfoResponse.data.task.body){
                    update.body = body;
                }
                if(completed !== latestTaskInfoResponse.data.task.completed){
                    update.completed = completed;
                }
                const response = await updateTask(update);
                if(typeof response.data?.message !== 'undefined'){
                    setMessage(response.data.message);
                    setTitle('');
                    setBody('');
                    setCompleted(false);
                    navigate(`/dash/tasks/display-task/${taskId}`);
                }else if(typeof response.error?.data?.message !== 'undefined'){
                    setMessage(response.error.data.message);
                }else{
                    setMessage('unknown error')
                }
            }else{
                if(typeof refreshResponse.error?.data?.message !== 'undefined'){
                    setMessage(refreshResponse.error.data.message);
                }else{
                    setMessage('unknown error');
                }
            }
        }else if(typeof latestTaskInfoResponse.error?.data?.message !== 'undefined'){
            setMessage(latestTaskInfoResponse.error.data.message);
        }else{
            setMessage('unknown error');
        }
        return null;
    }
    const content = (
        <form id = 'editTask' onSubmit={handleSubmit}>
            {(message.length > 0)?<div class='text-warning'>{message}</div>:''}
            <label for='title' class='form-label cursor-pointer'>Title:</label>
            <div>
                <input id='title' class='form-control border border-primary-subtle mb-2' type='text' placeholder ='Title'
                    name='title' value={title} onChange={onChange} />
            </div>
            <label for='body' class='form-label cursor-pointer'>Body:</label>
            <div>
                <textarea id='body' class='form-control border border-primary-subtle mb-2' placeholder='Body' name='body' value={body}
                    onChange={onChange}></textarea>
            </div>
            <div class='form-check mb-4'>
                <input id='completed' class='form-check-input border border-primary-subtle cursor-pointer' type='checkbox' name='completed' checked={completed}
                        onChange={onChange} />
                <label for='completed' class='form-check-label cursor-pointer'>Completed</label>
            </div>
            <div class='btn-group w-100'>
                <button class='btn btn-outline-primary' type='submit'
                    disabled={(
                        isLoading === true
                        ||isLoadingRefresh === true
                        ||isLoadingCheckTask
                    )}
                >
                    Edit
                </button>
                <button class='btn btn-outline-secondary' type='button'
                    onClick={()=>onClickCancel(taskId)}
                    disabled={(
                        isLoading === true
                        ||isLoadingRefresh === true
                        ||isLoadingCheckTask
                    )}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
    return content;
}
export default EditTaskForm;