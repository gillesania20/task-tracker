import { useParams } from 'react-router-dom';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
const DisplaySingleTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    let content = <></>;
    if(isLoading === true){
        content = <div>LOADING...</div>;
    }else if(typeof error !== 'undefined'){
        content = <div>ERROR</div>
    }else{
        content = <div id = 'DisplaySingleTask'>
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
            {/*<div>
                <span>Created At:</span>
                <span>01/20/1998</span>
            </div>
            <div>
                <span>Finished At:</span>
                <span>02/10/1998</span>
            </div>*/}
            <div>
                <span>Author:</span>
                <span>{data.user.username}</span>
            </div>
        </div>;
    }
    return content;
}
export default DisplaySingleTask;