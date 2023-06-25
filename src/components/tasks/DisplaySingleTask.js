import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
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
        content = <ClipLoader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = <div id = 'displaySingleTask'>
            <h1>Display task</h1>
            <div>
                <span>Title:</span>
                <span>{data.title}</span>
            </div>
            <div>
                <span>Body:</span>
                <span>{data.body}</span>
            </div>
            <div>
                <span>Status:</span>
                <span>{(data.completed)?'Completed':'Not Completed'}</span>
            </div>
            {
                (data.completed === true)?
                <div>
                    <span>Completed At:</span>
                    <span>{data.completedAt}</span>
                </div>
                :''
            }
            <div>
                <span>Author:</span>
                <span>{data.user.username}</span>
            </div>
            <div>
                <button onClick={()=>onClickEdit(taskId)}>Edit</button>
                <button onClick={()=>onClickDelete(taskId)}>Delete</button>
            </div>
        </div>;
    }else{
        content = <div>ERROR</div>
    }
    return content;
}
export default DisplaySingleTask;