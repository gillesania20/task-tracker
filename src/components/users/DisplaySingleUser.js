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
            <div id = 'displaySingleUser' className='shadow-lg py-5 px-3 rounded'>
                <h1 className='text-center mb-5'>Display user</h1>
                <div className='row pb-3'>
                    <span className='col'>Username:</span>
                    <span className='col'>{data.username}</span>
                </div>
                <div className='row pb-3'>
                    <span className='col'>Role:</span>
                    <span className='col'>{data.role}</span>
                </div>
                <div className='row pb-4'>
                    <span className='col'>Status:</span>
                    <span className='col'>{(data.active === true)
                        ?'Active'
                        :'Not Active'}</span>
                </div>
                <div className='row'>
                    <div className='btn-group'>
                        <button type='button'
                            onClick={onClickEdit}
                            className='btn btn-outline-primary'
                        >
                                Edit
                        </button>
                        <button type='button'
                            onClick={onClickDelete}
                            className='btn btn-outline-danger'
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