import { useLoginMutation } from './../../features/auth/authApiSlice';
import { useState } from 'react';
const Login = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
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
        if(username.length <= 0 && password.length <= 0){
            setMessage('Please fill up all text boxes');
        }else{
            response = await login({username, password});
            if(typeof response.error !== 'undefined'){
                setMessage(response.error.data.message);
            }else if(typeof response.data !== 'undefined'){
                setMessage(response.data.message);
            }
        }
        return null;
    }
    return (
        <form id = 'login' onSubmit={handleSubmit}>
            {(message !== '')?<div>{message}</div>:''}
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
                <a href='/'>Register</a>
            </div>
        </form>
    );
}
export default Login;