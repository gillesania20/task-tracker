import { useLoginMutation } from './../../features/auth/authApiSlice';
const Login = () => {
    const [login] = useLoginMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        login({username: 'admin', password: '1!abcdef'});
    }
    return (
        <form id = 'login' onSubmit={handleSubmit}>
            <div>
                <input type='text' />
            </div>
            <div>
                <input type='password' />
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