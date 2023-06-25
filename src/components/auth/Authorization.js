import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectRole } from './../../features/auth/authSlice';
import NotAuthorized from './../errors/NotAuthorized';
const Authorization = ({authorizedRoles}) => {
    const currentRole = useSelector(selectRole);
    const roles = authorizedRoles.filter(role => role === currentRole);
    let content = <></>;
    if(currentRole === null){
        content = <ClipLoader />;
    }else if(roles.length > 0){ 
        content = <Outlet />;
    }else{
        content = <NotAuthorized />;
    }
    return content;
}
export default Authorization;