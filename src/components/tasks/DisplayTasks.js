import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import { selectRole } from './../../features/auth/authSlice';
const DisplayTasks = ({authRoles}) => {
    const [refresh, { isLoading }] = useRefreshMutation();
    const [error, setError] = useState(null);
    let authorized = false;
    let content = null;
    const currentRole = useSelector(selectRole);
    const handleRefresh = async () => {
        const response = await refresh();
        if(typeof response.error !== 'undefined'){
            setError(response.error);
        }
    }
    useEffect(()=>{
        handleRefresh();
    }, []);
    if(typeof currentRole === 'string'){
        const roles = authRoles.filter(role=>role===currentRole);
        if(roles.length > 0){
            authorized = true;
        }
    }
    if(isLoading === true){
        content = <div>LOADING......</div>
    }else if(error !== null){
        content = <div>ERROR</div>
    }else if(currentRole !== null && authorized === false){
        content = <div>NOT AUTHORIZED</div>
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
        )
    }else{
        content = <div>ERROR</div>
    }
    return content;
}
export default DisplayTasks;