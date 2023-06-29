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
        <header id='headerSection' class='bg-dark pb-3'>
            <div class='bg-light'>
                <div class='container'>
                    <div class='d-flex justify-content-end py-2 column-gap-2'>
                        <span class='font-size-10 p-2 text-dark'>Welcome {decoded.username}</span>
                        <Link class='font-size-10 p-2 text-decoration-none text-primary' to={`/dash/users/display-user/${userId}`}>
                            User Info
                        </Link>
                        <button class='font-size-10 btn btn-outline-primary btn-sm' type='button' onClick={onClickLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <nav class='navbar navbar-expand-md pt-4' data-bs-theme='dark'>
                <div class='container'>
                    <span class='navbar-brand'>TaskTracker</span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id='nav' class='collapse navbar-collapse justify-content-end'>
                        <ul class='navbar-nav py-4 py-md-0'>
                            <li class='nav-item'>
                                <Link class='nav-link text-center py-4 py-md-0' to='/dash/tasks/display-all-tasks'>
                                    Show Tasks
                                </Link>
                            </li>
                            <li class='nav-item'>
                                <Link class='nav-link text-center py-4 py-md-0' to='/dash/tasks/add-new'>
                                    Add Task
                                </Link>
                            </li>
                            {
                                (role === 'Admin')?
                                <li class='nav-item'>
                                    <Link class='nav-link' to='/dash/users/display-all-users'>
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