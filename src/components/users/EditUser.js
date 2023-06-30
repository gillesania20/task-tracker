import { useParams } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import EditUserForm from './EditUserForm';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const EditUser = () => {
    const { userId } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userId});
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = <div id='editUser' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center mb-5'>Edit user</h1>
            <EditUserForm data={data} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditUser;