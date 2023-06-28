import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from './../../features/auth/authApiSlice';
const LoginForm = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    let response = null;
    const handleOnChange = (e) => {
        if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }
        return null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username.length <= 0 || password.length <= 0){
            setMessage('Please fill up all text boxes');
        }else{
            response = await login({username, password});
            if(response.data?.message === 'successful login'){
                setMessage(response.data.message);
                setUsername('');
                setPassword('');
                navigate('/dash/tasks/display-all-tasks');
            }else if(typeof response.error?.data?.message !== 'undefined'){
                setMessage(response.error.data.message);
            }else{
                setMessage('unknown error');
            }
        }
        return null;
    }
    return (
        <form id = 'loginForm' onSubmit={handleSubmit}>
            {(message.length > 0)?<div class='text-warning'>{message}</div>:''}
            <div>
                <label for='uname' class='form-label cursor-pointer'>Username:</label>
                <input type='text' id='uname' name='uname' value={username}
                    onChange={handleOnChange} class='form-control'
                    placeholder='Username'
                />
            </div>
            <div>
                <label for='pass' class='form-label cursor-pointer'>Password:</label>
                <input type='password' id='pass' name='pass' value={password}
                    onChange={handleOnChange} class='form-control mb-2'
                    placeholder='Password'
                />
            </div>
            <div>
                <button type='submit' disabled={isLoading}
                    class='btn btn-outline-primary w-100 mb-1'>
                    Login
                </button>
            </div>
            <div class='text-center'>
                <Link to='/register' class='text-decoration-none
                    text-primary'>Register</Link>
            </div>
        </form>
    );
}
export default LoginForm;