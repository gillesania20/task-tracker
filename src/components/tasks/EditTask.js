import { useParams } from 'react-router-dom';
import { useGetTaskQuery } from './../../features/tasks/taskApiSlice';
import EditTaskForm from './EditTaskForm';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const EditTask = () => {
    const { taskId } = useParams();
    const { data, isLoading, error } = useGetTaskQuery({taskId});
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />
    }else if(typeof data !== 'undefined'){
        content = <div id='editTask' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center mb-5'>Edit task</h1>
            <EditTaskForm data={data} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditTask;