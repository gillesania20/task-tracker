import { Outlet } from 'react-router-dom';
const AppLayout = () => {
    return (
        <div>
            <div className='bg-danger'>
                <div className='container text-light py-2 text-center'>This site uses third party cookies to function properly. Please allow third party cookies from this site if you have not yet done it.</div>
            </div>
            <Outlet />
        </div>
    )
}
export default AppLayout;