import { useSelector } from 'react-redux';
import { selectRole } from './../../features/auth/authSlice';
const DisplayTasks = ({authRoles}) => {
    const currentRole = useSelector(selectRole);
    let authorized = false;
    let roles = null;
    let content = <></>;
    if(currentRole !== null){
        roles = authRoles.filter(role=> role === currentRole);
        if(roles.length > 0){
            authorized = true;
        }
    }
    if(currentRole !== null && authorized === false){
        content = <div>NOT AUTHORIZED</div>;
    }else if(currentRole !== null && authorized === true){
        content = (
            <div id = 'DisplayTasks'>
                {console.log('content')}
                <div>
                    <span>Title</span>
                    <span>Status</span>
                </div>
                <div>
                    <span>taskone</span>
                    <span>Not Completed</span>
                </div>
                <div>
                    <span>tasktwo</span>
                    <span>Not Completed</span>
                </div>
                <div>
                    <span>taskthree</span>
                    <span>Completed</span>
                </div>
            </div>
        );
    }else{
        content = <div>ERROR</div>;
    }
    return content;
}
export default DisplayTasks;