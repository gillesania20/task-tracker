import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from './../../features/users/userApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import { selectRole, selectUserId } from './../../features/auth/authSlice';
const DeleteUserForm = () => {
    const { userId } = useParams();
    const clientId = useSelector(selectUserId);
    const [message, setMessage] = useState('');
    const [deleteUser, { isLoading }] = useDeleteUserMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const navigate = useNavigate();
    const role = useSelector(selectRole);
    const onClickCancel = () => {
        navigate(`/dash/users/display-user/${userId}`);
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const refreshResponse = await refresh();
        if(refreshResponse.data?.message === 'successful token refresh'){
            const response = await deleteUser({userId});
            if(response.data?.message === 'user deleted'){
                setMessage(response.data.message);
                if(
                    role === 'Admin'
                    && clientId !== userId
                ){
                    navigate('/dash/users/display-all-users');
                }else if(
                    role === 'Admin'
                    && clientId === userId
                ){
                    navigate('/login');
                }else{
                    navigate('/login');
                }
            }else if(typeof response.error?.data?.message !== 'undefined'){
                setMessage(response.error.data.message);
            }else{
                setMessage('unknown error');
            }
        }else if(typeof refreshResponse.error?.data?.message !== 'undefined'){
            setMessage(refreshResponse.error.data.message);
        }else{
            setMessage('unknown error');
        }
        return null;
    }
    const content = <form id='deleteUser' onSubmit={handleSubmit}>
        {(message.length>0)?<div>{message}</div>:''}
        <div>
            <span>UserId:</span>
            <span>{userId}</span>
        </div>
        <div>
            <button type='submit'
                disabled={(
                    isLoading === true
                    ||isLoadingRefresh === true
                )}
            >
                Delete
            </button>
            <button type='button'
                onClick={onClickCancel}
                disabled={(
                    isLoading === true
                    ||isLoadingRefresh === true
                )}
            >
                Cancel
            </button>
        </div>
    </form>;
    return content;
}
export default DeleteUserForm;