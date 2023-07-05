import { Link } from 'react-router-dom';
const LoginFirst = () => {
    return (
        <div className='shadow-lg py-5 px-3 rounded text-center'>
            <div>
                Please login first.
            </div>
            <div>
                <Link to='/login' className='text-decoration-none'>Login</Link>
            </div>
        </div>
    );
}
export default LoginFirst;