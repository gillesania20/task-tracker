import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation } from './../../features/users/userApiSlice';
const RegisterForm = () => {
    const [register, { isLoading}] = useAddUserMutation();
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }else if(e.target.name === 'confirmPass'){
            setConfirmPassword(e.target.value);
        }
        return null;
    }
    const onClickCancel = () => {
        navigate('/login');
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username.length <= 0
            || password.length <= 0
            || confirmPassword.length <= 0
        ){
            setMessage('Please fill up all text boxes')
        }else if(password !== confirmPassword){
            setMessage('Please make sure confirm password is same in password');
        }else{
            const response = await register({username, password});
            if(response.data?.message === 'created new user'){
                setMessage(response.data.message);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            }else if(typeof response.error?.data?.message !== 'undefined'){
                setMessage(response.error.data.message);
            }else{
                setMessage('unknown error');
            }
        }
        return null;
    }
    return (
        <form id = 'registerForm' onSubmit={handleSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div>
                <input type='text' placeholder = 'Username' name='uname'
                    value={username} onChange={handleOnChange}
                />
            </div>
            <div>
                <input type='password' placeholder='Password' name='pass'
                    value={password} onChange={handleOnChange}
                />
            </div>
            <div>
                <input type='password' placeholder='Confirm Password' name='confirmPass'
                    value={confirmPassword} onChange={handleOnChange}
                />
            </div>
            <div>
                <button type='submit' disabled={isLoading}>
                    Register
                </button>
                <button type='button' onClick={onClickCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
export default RegisterForm;