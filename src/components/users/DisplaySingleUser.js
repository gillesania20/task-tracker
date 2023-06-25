import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
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
        content = <ClipLoader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = (
            <div id = 'displaySingleUser'>
                <h1>Display user</h1>
                <div>
                    <span>Username:</span>
                    <span>{data.username}</span>
                </div>
                <div>
                    <span>Role:</span>
                    <span>{data.role}</span>
                </div>
                <div>
                    <span>Status:</span>
                    <span>{(data.active === true)
                        ?'Active'
                        :'Not Active'}</span>
                </div>
                <div>
                    <button type='button'
                        onClick={onClickEdit}
                    >
                            Edit
                    </button>
                    <button type='button'
                        onClick={onClickDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }else{
        content = <DefaultError />;
    }
    return content; 
}
export default DisplaySingleUser;