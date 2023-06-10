import { useParams } from 'react-router-dom';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
import EditTaskForm from './EditTaskForm';
const EditTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    let content = <></>;
    if(isLoading === true){
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>
    }else if(typeof data !== 'undefined'){
        content = <EditTaskForm data={data} />;
    }else{
        content = <div>ERROR</div>;
    }
    return content;
}
export default EditTask;