import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectRole } from './../../features/auth/authSlice';
const Authorization = ({authorizedRoles}) => {
    const currentRole = useSelector(selectRole);
    const roles = authorizedRoles.filter(role => role === currentRole);
    let content = <></>;
    if(currentRole === null){
        content = <div>LOADING...</div>;
    }else if(roles.length > 0){
        content = <Outlet />;
    }else{
        content = <div>NOT AUTHORIZED</div>
    }
    return content;
}
export default Authorization;