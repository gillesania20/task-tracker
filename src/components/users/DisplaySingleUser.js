import { useParams } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
const DisplaySingleUser = () => {
    const { userId } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userId});
    let content = <></>;
    if(isLoading === true){
        content = <div>LOADING...</div>;
    }else if(typeof error?.data?.message !== 'undefined'){
        content = <div>{error.data.message}</div>;
    }else if(typeof data !== 'undefined'){
        content = (
            <div id = 'DisplaySingleUser'>
                <div>
                    <span>Username:</span>
                    <span>{data.username}</span>
                </div>
                <div>
                    <span>Role:</span>
                    <span>{data.role}</span>
                </div>
                <div>
                    <span>Status:</span>
                    <span>{(data.active === true)
                        ?'Active'
                        :'Not Active'}</span>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        );
    }else{
        content = <div>ERROR</div>;
    }
    return content; 
}
export default DisplaySingleUser;