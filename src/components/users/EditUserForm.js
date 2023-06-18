import { useState } from 'react';
import { useUpdateUserMutation, useCheckUserMutation } from './../../features/users/userApiSlice';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const EditUserForm = ({data}) => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(data.username);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [refresh, { isLoading: isLoadingRefresh }] = useRefreshMutation();
    const [checkUser, { isLoading: isLoadingCheckUser }] = useCheckUserMutation();
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
            }
        }else if(typeof latestUserInfoResponse.error?.data?.message !== 'undefined'){
            setMessage(latestUserInfoResponse.error.data.message);
        }else{
            setMessage('unknown error');
        }
        return null;
    }
    return (
        <form id = 'EditUser' onSubmit={handleSubmit}>
            {(message.length>0)?<div>{message}</div>:''}
            <div>
                <span>Username:</span>
                <input type='text' name='username'
                    value={username} onChange={onChange} />
            </div>
            <div>
                <span>Leave password empty if you will not change
                    password
                </span>
            </div>
            <div>
                <span>Password:</span>
                <input type='password' name='password'
                    value={password} onChange={onChange} />
            </div>
            <div>
                <span>Retype Password</span>
                <input type='password' name='retypePassword'
                    value={retypePassword} onChange={onChange} />
            </div>
            <div>
                {(isLoading === true || isLoadingRefresh === true
                || isLoadingCheckUser === true)?
                    <div>LOADING...</div>
                    :<button type='submit'>Edit User</button>
                }
            </div>
        </form>
    );
}
export default EditUserForm;