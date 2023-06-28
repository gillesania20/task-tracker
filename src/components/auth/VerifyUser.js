import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import LoginFirst from './../errors/LoginFirst';
import Loader from './../loader/Loader';
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
        content = <Loader />;
    }else if(
        typeof error?.data?.message !== 'undefined'
    ){
        content = <LoginFirst />;
    }else if(
        typeof data?.message !== 'undefined'
    ){
        content = <Outlet />
    }return content;
}
export default VerifyUser;