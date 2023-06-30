import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import decodeToken from './../../functions/decodeToken';
import {
    selectUserId,
    selectToken,
    selectRole
} from './../../features/auth/authSlice';
import { useLogoutMutation } from './../../features/auth/authApiSlice';
const Header = () => {
    const [logout] = useLogoutMutation();
    const token = useSelector(selectToken);
    const userId = useSelector(selectUserId);
    const role = useSelector(selectRole);
    const decoded = decodeToken(token);
    const navigate = useNavigate();
    const onClickLogout = async () => {
        await logout();
        navigate('/login');
        return null;
    }
    return (
        <header id='headerSection' className='bg-dark pb-3'>
            <div className='bg-light'>
                <div className='container'>
                    <div className='d-flex justify-content-end py-2 column-gap-2'>
                        <span className='font-size-10 p-2 text-dark'>Welcome {decoded.username}</span>
                        <Link className='font-size-10 p-2 text-decoration-none text-primary' to={`/dash/users/display-user/${userId}`}>
                            User Info
                        </Link>
                        <button className='font-size-10 btn btn-outline-primary btn-sm' type='button' onClick={onClickLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <nav className='navbar navbar-expand-md pt-4' data-bs-theme='dark'>
                <div className='container'>
                    <span className='navbar-brand'>TaskTracker</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id='nav' className='collapse navbar-collapse justify-content-end'>
                        <ul className='navbar-nav py-4 py-md-0'>
                            <li className='nav-item'>
                                <Link className='nav-link text-center py-4 py-md-0' to='/dash/tasks/display-all-tasks'>
                                    Show Tasks
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link text-center py-4 py-md-0' to='/dash/tasks/add-new'>
                                    Add Task
                                </Link>
                            </li>
                            {
                                (role === 'Admin')?
                                <li className='nav-item'>
                                    <Link className='nav-link text-center py-4 py-md-0' to='/dash/users/display-all-users'>
                                        Show Users
                                    </Link>
                                </li>
                                :''
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;