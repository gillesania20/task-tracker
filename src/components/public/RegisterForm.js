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
            {(message.length > 0)?<div class='text-warning'>{message}</div>:''}
            <div>
                <label for='uname' class='form-label cursor-pointer'>Username:</label>
                <input type='text' id='uname' placeholder = 'Username' name='uname'
                    value={username} onChange={handleOnChange}
                    class='form-control'
                />
            </div>
            <div>
                <label for='pass' class='form-label cursor-pointer'>Password:</label>
                <input type='password' id='pass' placeholder='Password' name='pass'
                    value={password} onChange={handleOnChange}
                    class='form-control'
                />
            </div>
            <div>
                <label for='confirmPass' class='form-label cursor-pointer'>Confirm password:</label>
                <input type='password' id='confirmPass' placeholder='Confirm password' name='confirmPass'
                    value={confirmPassword} onChange={handleOnChange}
                    class='form-control mb-2'
                />
            </div>
            <div>
                <button type='submit' disabled={isLoading} class='btn btn-outline-primary w-100 mb-2'>
                    Register
                </button>
                <button type='button' onClick={onClickCancel} class='btn btn-outline-light w-100'>
                    Cancel
                </button>
            </div>
        </form>
    );
}
export default RegisterForm;