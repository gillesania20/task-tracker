import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from './../../features/auth/authApiSlice';
const Login = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
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
        <form id = 'login' onSubmit={handleSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div>
                <input type='text' name='uname' value={username}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <input type='password' name='pass' value={password}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
        </form>
    );
}
export default Login;