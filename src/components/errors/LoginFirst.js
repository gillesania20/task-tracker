import { Link } from 'react-router-dom';
const LoginFirst = () => {
    return (
        <div class='shadow-lg py-5 px-3 rounded text-center'>
            <dv>
                Please login first.
            </dv>
            <div>
                <Link to='/login' class='text-decoration-none'>Login</Link>
            </div>
        </div>
    );
}
export default LoginFirst;