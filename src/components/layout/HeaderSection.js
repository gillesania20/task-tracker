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
            <nav class='container'>
                <div class='d-flex justify-content-end p-2 column-gap-2'>
                    <span class='font-size-10 p-2 text-light'>Welcome {decoded.username}</span>
                    <Link class='font-size-10 p-2 text-decoration-none text-primary' to={`/dash/users/display-user/${userId}`}>
                        User Info
                    </Link>
                    <button class='font-size-10 btn btn-outline-primary btn-sm' type='button' onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
                <div class='d-flex justify-content-center'>
                    <ul class='nav'>
                        <li class='nav-item'>
                            <Link class='nav-link' to='/dash/tasks/display-all-tasks'>
                                Show Tasks
                            </Link>
                        </li>
                        <li class='nav-item'>
                            <Link class='nav-link' to='/dash/tasks/add-new'>
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
            </nav>
        </header>
    );
}
export default Header;