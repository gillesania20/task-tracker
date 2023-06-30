import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from './../../features/tasks/taskApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const DisplayTasks = () => {
    const { data, isLoading, error } = useGetTasksQuery();
    const navigate = useNavigate();
    const onClick = (taskId) => {
        navigate(`/dash/tasks/display-task/${taskId}`)
        return null;
    }
    let copiedArray = null;
    const compareData = (a, b) =>{
        let output = null;
        if(a.completed === true && b.completed === false){
            output = 1;
        }else if(a.completed === false && b.completed === true){
            output = -1;
        }else{
            output = 0;
        }
        return output;
    }
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message}/>;
    }else if(data.length <= 0){
        content = <div id='displayTasks' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center mb-5'>Display all tasks</h1>
            <div className='text-center'>No tasks yet</div>
        </div>;
    }else if(data.length > 0){
        copiedArray = data.map(item=>item);
        copiedArray.sort(compareData);
        content = (
            <div id='displayTasks' className='shadow-lg py-5 px-3 rounded'>
                <h1 className='text-center mb-5'>Display all tasks</h1>
                <div className='row mb-3 p-2'>
                    <span className='col fw-medium text-center'>Title</span>
                    <span className='col fw-medium text-center'>Status</span>
                </div>
                {copiedArray.map(task =><div key={task._id}
                    onClick={()=>onClick(task._id)} className='row mb-3 rounded p-2 row-item'>
                    <span className='col text-center'>{task.title}</span>
                    <span className='col text-center'>{task.completed ?
                        'Completed'
                        : 'Not Completed'}</span>
                </div>)}
            </div>
        );
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplayTasks;