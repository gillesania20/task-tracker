import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from './../../features/users/userApiSlice';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import Loader from './../loader/Loader';
const DisplayUsers = () => {
    const { data, isLoading, error } = useGetUsersQuery();
    const navigate = useNavigate();
    let copiedArray = null;
    const compareData = (a,b) => {
        let output = null;
        if(a.active === false && b.active === true){
            output = 1;
        }else if(a.active === true && b.active === false){
            output = -1;
        }else{
            output = 0;
        }
        return output;
    }
    const onClick = (userId) => {
        navigate(`/dash/users/display-user/${userId}`);
        return null;
    }
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(data.length <= 0){
        content = <div id='displayUsers' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center'>Display all users</h1>
            <div className='text-center'>no users yet</div>
        </div>;
    }else if(data.length > 0){
        copiedArray = data.map(item=>item);
        copiedArray.sort(compareData);
        content = (
            <div id = 'displayUsers' className='shadow-lg py-5 px-3 rounded'>
                <h1 className='text-center mb-5'>Display all users</h1>
                <div className='row mb-3 p-2'>
                    <span className='col fw-medium text-center'>Username</span>
                    <span className='col fw-medium text-center'>Role</span>
                    <span className='col fw-medium text-center'>Status</span>
                </div>
                {copiedArray.map((user) => {
                    return <div key={user._id}
                        onClick={()=>onClick(user._id)}
                        className='row mb-3 rounded p-2 row-item'>
                        <span className='col text-center'>{user.username}</span>
                        <span className='col text-center'>{user.role}</span>
                        <span className='col text-center'>{(user.active === true)?
                            'Active':
                            'Not Active'}</span>
                    </div>
                })}
            </div>
        );
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplayUsers;