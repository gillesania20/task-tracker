import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteUserMutation } from './../../features/users/userApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const DeleteUserForm = () => {
    const { userId } = useParams();
    const [message, setMessage] = useState('');
    const [deleteUser, { isLoading }] = useDeleteUserMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const refreshResponse = await refresh();
        if(refreshResponse.data?.message === 'successful token refresh'){
            const response = await deleteUser({userId});
            if(response.data?.message === 'user deleted'){
                setMessage(response.data.message);
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
    const content = <form id='DeleteUser' onSubmit={handleSubmit}>
        {(message.length>0)?<div>{message}</div>:''}
        <div>
            <span>UserId:</span>
            <span>{userId}</span>
        </div>
        <div>
            {(isLoading === true || isLoadingRefresh === true)?
                <div>LOADING...</div>
                :<button type='submit'>Delete</button>
            }
            <button type='button'>Cancel</button>
        </div>
    </form>;
    return content;
}
export default DeleteUserForm;