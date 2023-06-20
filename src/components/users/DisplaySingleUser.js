import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
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
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(typeof data !== 'undefined'){
        content = (
            <div id = 'DisplaySingleUser'>
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
        content = <div>ERROR</div>;
    }
    return content; 
}
export default DisplaySingleUser;