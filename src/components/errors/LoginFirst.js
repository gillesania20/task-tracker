import { Link } from 'react-router-dom';
const LoginFirst = () => {
    return (
        <div>
            <dv>
                Please login first.
            </dv>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
export default LoginFirst;