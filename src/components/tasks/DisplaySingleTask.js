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
        content = <div id = 'displaySingleTask' class='shadow-lg py-5 px-3 rounded'>
            <h1 class='text-center mb-5'>Display task</h1>
            <div class=''>
                <div class='row pb-3'>
                    <span class='col'>Title:</span>
                    <span class='col'>{data.title}</span>
                </div>
                <div class='row pb-3'>
                    <span class='col'>Body:</span>
                    <span class='col'>{data.body}</span>
                </div>
                <div class='row pb-3'>
                    <span class='col'>Status:</span>
                    <span class='col'>{(data.completed)?'Completed':'Not Completed'}</span>
                </div>
                {
                    (data.completed === true)?
                    <div class='row pb-3'>
                        <span class='col'>Completed At:</span>
                        <span class='col'>{data.completedAt}</span>
                    </div>
                    :''
                }
                <div class='row pb-4'>
                    <span class='col'>Author:</span>
                    <span class='col'>{data.user.username}</span>
                </div>
                <div class='row'>
                    <div class='btn-group'>
                        <button class='btn btn-outline-primary' onClick={()=>onClickEdit(taskId)}>Edit</button>
                        <button class='btn btn-outline-danger' onClick={()=>onClickDelete(taskId)}>Delete</button>
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