import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
import EditTaskForm from './EditTaskForm';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const EditTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    let content = <></>;
    if(isLoading === true){
        content = <ClipLoader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />
    }else if(typeof data !== 'undefined'){
        content = <div id='editTask'>
            <h1>Edit task</h1>
            <EditTaskForm data={data} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditTask;