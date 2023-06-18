import { useParams } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import EditUserForm from './EditUserForm';
const EditUser = () => {
    const { userId } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userId});
    let content = <></>;
    if(isLoading === true){
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(typeof data !== 'undefined'){
        content = <EditUserForm data={data} />;
    }else{
        content = <div>Error</div>;
    }
    return content;
}
export default EditUser;