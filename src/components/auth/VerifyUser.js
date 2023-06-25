import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import LoginFirst from './../errors/LoginFirst';
const VerifyUser = () => {
    const [refresh, { data, isLoading, error }] = useRefreshMutation();
    const flagRef = useRef(true);
    let content = <></>;
    useEffect(()=>{
        if(flagRef.current === true){
            refresh();
            flagRef.current = false;
        }
    }, [refresh]);
    if(isLoading === true){
        content = <ClipLoader />;
    }else if(
        typeof error?.data?.message !== 'undefined'
    ){
        content = <LoginFirst />;
    }else if(
        typeof data?.message !== 'undefined'
    ){
        content = <Outlet />
    }
    return content;
}
export default VerifyUser;