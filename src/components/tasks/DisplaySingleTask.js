import { useParams, useNavigate } from 'react-router-dom';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const DisplaySingleTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    const navigate = useNavigate();
    const onClickEdit = (editId) => {
        navigate(`/dash/tasks/edit-task/${editId}`);
        return null;
    }
    const onClickDelete = (deleteId) => {
        navigate(`/dash/tasks/delete-task/${deleteId}`);
        return null;
    }
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = <div id = 'displaySingleTask' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center mb-5'>Display task</h1>
            <div className=''>
                <div className='row pb-3'>
                    <span className='col'>Title:</span>
                    <span className='col'>{data.title}</span>
                </div>
                <div className='row pb-3'>
                    <span className='col'>Body:</span>
                    <span className='col'>{data.body}</span>
                </div>
                <div className='row pb-3'>
                    <span className='col'>Status:</span>
                    <span className='col'>{(data.completed)?'Completed':'Not Completed'}</span>
                </div>
                {
                    (data.completed === true)?
                    <div className='row pb-3'>
                        <span className='col'>Completed At:</span>
                        <span className='col'>{data.completedAt}</span>
                    </div>
                    :''
                }
                <div className='row pb-4'>
                    <span className='col'>Author:</span>
                    <span className='col'>{data.user.username}</span>
                </div>
                <div className='row'>
                    <div className='btn-group'>
                        <button className='btn btn-outline-primary' onClick={()=>onClickEdit(taskId)}>Edit</button>
                        <button className='btn btn-outline-danger' onClick={()=>onClickDelete(taskId)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />
    }
    return content;
}
export default DisplaySingleTask;