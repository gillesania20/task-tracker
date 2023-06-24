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
        <header>
            <nav>
                <div>
                    <span>Welcome {decoded.username}</span>
                    <Link to={`/dash/users/display-user/${userId}`}>
                        User Info
                    </Link>
                    <button type='button' onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
                <div>
                    <Link to='/dash/tasks/display-all-tasks'>
                        Show Tasks
                    </Link>
                    <Link to='/dash/tasks/add-new'>
                        Add Task
                    </Link>
                    {
                        (role === 'Admin')?
                        <Link to='/dash/users/display-all-users'>
                            Show Users
                        </Link>
                        :''
                    }
                </div>
            </nav>
        </header>
    );
}
export default Header;