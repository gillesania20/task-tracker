import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateTaskMutation } from './../../features/tasks/taskApiSlice';
const EditTaskForm = ({data}) => {
    const { taskId } = useParams();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState(data.title);
    const [body, setBody] = useState(data.body);
    const [completed, setCompleted] = useState(data.completed);
    const [updateTask, { isLoading }] = useUpdateTaskMutation();
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateTask({taskId, title, body, completed});
        if(typeof response.data?.message !== 'undefined'){
            setMessage(response.data.message);
        }else if(typeof response.error?.data?.message !== 'undefined'){
            setMessage(response.error.data.message);
        }else{
            setMessage('unknown error')
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
                    {
                        (isLoading === true)?
                        <div>LOADING...</div>
                        :<input type='checkbox' name='completed' checked={completed}
                            onChange={onChange} />
                    }
                </span>
            </div>
            <div>
                <button type='submit'>Edit</button>
            </div>
        </form>
    );
    return content;
}
export default EditTaskForm;