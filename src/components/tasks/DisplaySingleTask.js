import { useParams } from 'react-router-dom';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
const DisplaySingleTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    let content = <></>;
    if(isLoading === true){
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(typeof data !== 'undefined'){
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
        </div>;
    }else{
        content = <div>ERROR</div>
    }
    return content;
}
export default DisplaySingleTask;