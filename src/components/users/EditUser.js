import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import EditUserForm from './EditUserForm';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const EditUser = () => {
    const { userId } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userId});
    let content = <></>;
    if(isLoading === true){
        content = <ClipLoader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = <div id='editUser'>
            <h1>Edit user</h1>
            <EditUserForm data={data} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditUser;