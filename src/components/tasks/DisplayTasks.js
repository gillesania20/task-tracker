import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from './../../features/tasks/taskApiSlice';
const DisplayTasks = () => {
    const { data, isLoading, error } = useGetTasksQuery();
    const navigate = useNavigate();
    const onClick = (taskId) => {
        navigate(`/dash/tasks/display-task/${taskId}`)
        return null;
    }
    let content = <></>;
    if(isLoading === true){
        content = <div>IS LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(data.length <= 0){
        content = <div>No task yet</div>;
    }else if(data.length > 0){
        content = (
            <div id = 'DisplayTasks'>
                <div>
                    <span>Title</span>
                    <span>Status</span>
                </div>
                {data.map(task =><div key={task._id}
                    onClick={()=>onClick(task._id)}>
                    <span>{task.title}</span>
                    <span>{task.completed ?
                        'Completed'
                        : 'Not Completed'}</span>
                </div>)}
            </div>
        );
    }else{
        content = <div>ERROR</div>;
    }
    return content;
}
export default DisplayTasks;