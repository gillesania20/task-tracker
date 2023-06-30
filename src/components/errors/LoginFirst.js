import { Link } from 'react-router-dom';
const LoginFirst = () => {
    return (
        <div className='shadow-lg py-5 px-3 rounded text-center'>
            <dv>
                Please login first.
            </dv>
            <div>
                <Link to='/login' className='text-decoration-none'>Login</Link>
            </div>
        </div>
    );
}
export default LoginFirst;