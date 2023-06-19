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
        <form id = 'EditTask' onSubmit={handleSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div><span>Title:</span></div>
            <div>
                <input type='text' placeholder ='Title'
                    name='title' value={title} onChange={onChange} />
            </div>
            <div><span>Body:</span></div>
            <div>
                <textarea placeholder='Body' name='body' value={body}
                    onChange={onChange}></textarea>
            </div>
            <div>
                <span>Completed:</span>
                <span>
                    <input type='checkbox' name='completed' checked={completed}
                            onChange={onChange} />
                </span>
            </div>
            <div>
                {
                    (isLoading === true || isLoadingRefresh === true
                        || isLoadingCheckTask)?
                    <div>LOADING...</div>
                    :<button type='submit'>Edit</button>
                }
                <button type='button'
                    onClick={()=>onClickCancel(taskId)}
                    disabled={(isLoading === true || isLoadingRefresh === true)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
    return content;
}
export default EditTaskForm;