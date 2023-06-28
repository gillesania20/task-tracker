import { useState } from 'react';
import { useAddTaskMutation } from './../../features/tasks/taskApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const AddNewTaskForm = () => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addTask, { isLoading }] = useAddTaskMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const onChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else if(e.target.name === 'body'){
            setBody(e.target.value);
        }
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const refreshResponse = await refresh();
        if(refreshResponse.data?.message === 'successful token refresh'){
            const response = await addTask({title, body});
            if(typeof response.error?.data?.message !== 'undefined'){
                setMessage(response.error.data.message);
            }else if(typeof response.data?.message !== 'undefined'){
                setMessage(response.data.message);
                setTitle('');
                setBody('');
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
    return (
        <form id = 'addNewTaskForm' onSubmit={handleSubmit}
            class=''>
            {(message.length > 0)?<div class='text-warning'>{message}</div>:''}
            <div>
                <label for='title' class='form-label cursor-pointer'>Title:</label>
                <input type='text' id='title' placeholder='Title'
                    name='title' value={title} onChange={onChange}
                    class='form-control border border-primary-subtle mb-2' />
            </div>
            <div>
                <label for='body' class='form-label cursor-pointer'>Body:</label>
                <textarea placeholder='Body' name='body'
                    value={body} onChange={onChange}
                    class='form-control border border-primary-subtle mb-4' rows='5'></textarea>
            </div>
            <div class='text-center'>
                <button type='submit'
                    disabled={(isLoading === true
                        || isLoadingRefresh === true
                    )}
                    class='btn btn-outline-primary'
                >
                    Add Task
                </button>
            </div>
        </form>
    );
}
export default AddNewTaskForm;