import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation } from './../../features/tasks/taskApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const DeleteTaskForm = () => {
    const { taskId } = useParams();
    const [message, setMessage] = useState('');
    const [deleteTask, { isLoading }] = useDeleteTaskMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const navigate = useNavigate();
    const onClickCancel = (CancelId) => {
        navigate(`/dash/tasks/display-task/${CancelId}`);
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const refreshResponse = await refresh();
        if(refreshResponse.data?.message === 'successful token refresh'){
            const response = await deleteTask({taskId});
            if(typeof response.error?.data?.message !== 'undefined'){
                setMessage(response.error.data.message);
            }else if(typeof response.data?.message !== 'undefined'){
                setMessage(response.data.message);
                navigate('/dash/tasks/display-all-tasks')
            }else{
                setMessage('unknown error');
            }
        }else{
            if(typeof refreshResponse.error?.data?.message !== 'undefined'){
                setMessage(refreshResponse.error.data.message);
            }else{
                setMessage('unknown error');
            }
        }
        return null;
    }
    let content = (
        <form id='DeleteTask' onSubmit={handleSubmit}>
            {(message.length>0)?<div>{message}</div>:''}
            <div>
                <span>Task Id:</span>
                <span>{taskId}</span>
            </div>
            <div>
                {
                    (isLoading === true || isLoadingRefresh === true)?
                    <div>Loading...</div>:
                    <button type='submit'>Delete</button>
                }
                <button
                    disabled={(isLoading === true || isLoadingRefresh === true)}
                    onClick={()=>onClickCancel(taskId)}
                >Cancel</button>
            </div>
        </form>
    );
    return content;
}
export default DeleteTaskForm;