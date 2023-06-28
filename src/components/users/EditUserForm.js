import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateUserMutation, useCheckUserMutation } from './../../features/users/userApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import { selectRole, selectUserId } from './../../features/auth/authSlice';
const EditUserForm = ({data}) => {
    const { userId } = useParams();
    const clientId = useSelector(selectUserId);
    const role = useSelector(selectRole);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(data.username);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const [checkUser, { isLoading: isLoadingCheckUser }] = useCheckUserMutation();
    const navigate = useNavigate();
    const onChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value);
        }else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }else if(e.target.name === 'retypePassword'){
            setRetypePassword(e.target.value);
        }
        return null;
    }
    const onClickCancel = () => {
        navigate(`/dash/users/display-user/${userId}`)
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const update = {};
        const latestUserInfoResponse = await checkUser({userId: data._id.toString()});
        if(latestUserInfoResponse.data?.message === 'user found'){
            if(password !== retypePassword){
                setMessage('password and retype password should be the same');
            }else{
                const refreshResponse = await refresh();
                if(refreshResponse.data?.message === 'successful token refresh'){
                    update.userId = latestUserInfoResponse.data.user._id.toString();
                    if(username !== latestUserInfoResponse.data.user.username){
                        update.username = username;
                    }
                    if(password.length > 0){
                        update.password = password;
                    }
                    const response = await updateUser(update);
                    if(typeof response.data?.message !== 'undefined'){
                        if(
                            role === 'Admin'
                            && clientId === userId
                        ){
                            setMessage(response.data.message);
                            setUsername('');
                            setPassword('');
                            setRetypePassword('');
                            navigate('/login');
                        }else if(
                            role === 'Admin'
                            && clientId !== userId
                        ){
                            setMessage(response.data.message);
                            setUsername('');
                            setPassword('');
                            setRetypePassword('');
                            navigate(`/dash/users/display-user/${userId}`);
                        }else{
                            if(username !== latestUserInfoResponse.data.user.username){
                                setMessage(response.data.message);
                                setUsername('');
                                setPassword('');
                                setRetypePassword('');
                                navigate('/login');
                            }else{
                                setMessage(response.data.message);
                                setUsername('');
                                setPassword('');
                                setRetypePassword('');
                                navigate(`/dash/users/display-user/${userId}`);
                            }
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
            }
        }else if(typeof latestUserInfoResponse.error?.data?.message !== 'undefined'){
            setMessage(latestUserInfoResponse.error.data.message);
        }else{
            setMessage('unknown error');
        }
        return null;
    }
    return (
        <form id = 'editUser' onSubmit={handleSubmit}>
            {(message.length>0)?<div class='text-warning'>{message}</div>:''}
            <div>
                <label for='username' class='form-label cursor-pointer'
                >Username:</label>
                <input id='username' type='text' name='username'
                    value={username} onChange={onChange} 
                    class='form-control border border-primary-subtle mb-2' />
            </div>
            <div>
                <span class='form-text text-danger'>Leave password empty if you will not change
                    password
                </span>
            </div>
            <div>
                <label for='password' class='form-label cursor-pointer'>Password:</label>
                <input id='password' type='password' name='password'
                    value={password} onChange={onChange}
                    class='form-control border border-primary-subtle mb-2'
                />
            </div>
            <div>
                <label for='retypePassword' class='form-label cursor-pointer'>Retype Password:</label>
                <input id='retypePassword' type='password' name='retypePassword'
                    value={retypePassword} onChange={onChange}
                    class='form-control border border-primary-subtle mb-4'
                />
            </div>
            <div class='btn-group w-100'>
                <button type='submit'
                    disabled={(
                        isLoading === true
                        ||isLoadingRefresh === true
                        ||isLoadingCheckUser === true
                    )}
                    class='btn btn-outline-primary'
                >
                    Edit User
                </button>
                <button type='button'
                    onClick={onClickCancel}
                    disabled={(
                        isLoading === true
                        ||isLoadingRefresh === true
                        ||isLoadingCheckUser === true
                    )}
                    class='btn btn-outline-secondary'
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
export default EditUserForm;