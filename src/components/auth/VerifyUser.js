import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
const VerifyUser = () => {
    const [error, setError] = useState(null);
    const [refresh, { isLoading }] = useRefreshMutation();
    const flagRef = useRef(true);
    let content = <></>;
    const handleRefresh = async () => {
        const response = await refresh();
        if(typeof response.error !== 'undefined'){
            setError(response.error);
        }
        return null;
    }
    useEffect(()=>{
        if(flagRef.current === true){
            handleRefresh();
            flagRef.current = false;
        }
    }, []);
    if(isLoading === true){
        content = <div>IS LOADING...</div>;
    }else if(error !== null){
        content = <div>PLEASE LOGIN FIRST</div>;
    }else{
        content = <Outlet />
    }
    return content;
}
export default VerifyUser;