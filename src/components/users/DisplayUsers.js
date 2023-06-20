import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from './../../features/users/userApiSlice';
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
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(data.length <= 0){
        content = <div>no users yet</div>;
    }else if(data.length > 0){
        copiedArray = data.map(item=>item);
        copiedArray.sort(compareData);
        content = (
            <div id = 'DisplayUsers'>
                <div>
                    <span>Username</span>
                    <span>Role</span>
                    <span>Status</span>
                </div>
                {copiedArray.map((user) => {
                    return <div key={user._id}
                        onClick={()=>onClick(user._id)}>
                        <span>{user.username}</span>
                        <span>{user.role}</span>
                        <span>{(user.active === true)?
                            'Active':
                            'Not Active'}</span>
                    </div>
                })}
            </div>
        )
    }else{
        content = <div>ERROR</div>
    }
    return content;
}
export default DisplayUsers;