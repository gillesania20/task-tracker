import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const DisplaySingleUser = () => {
    const { userId } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userId});
    const navigate = useNavigate();
    const onClickEdit = () => {
        navigate(`/dash/users/edit-user/${userId}`);
        return null;
    }
    const onClickDelete = () => {
        navigate(`/dash/users/delete-user/${userId}`)
    }
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = (
            <div id = 'displaySingleUser' class='shadow-lg py-5 px-3 rounded'>
                <h1 class='text-center mb-5'>Display user</h1>
                <div class='row pb-3'>
                    <span class='col'>Username:</span>
                    <span class='col'>{data.username}</span>
                </div>
                <div class='row pb-3'>
                    <span class='col'>Role:</span>
                    <span class='col'>{data.role}</span>
                </div>
                <div class='row pb-4'>
                    <span class='col'>Status:</span>
                    <span class='col'>{(data.active === true)
                        ?'Active'
                        :'Not Active'}</span>
                </div>
                <div class='row'>
                    <div class='btn-group'>
                        <button type='button'
                            onClick={onClickEdit}
                            class='btn btn-outline-primary'
                        >
                                Edit
                        </button>
                        <button type='button'
                            onClick={onClickDelete}
                            class='btn btn-outline-danger'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }else{
        content = <DefaultError />;
    }
    return content; 
}
export default DisplaySingleUser;