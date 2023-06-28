import {
    Outlet
} from 'react-router-dom';
import Header from './HeaderSection';
import Footer from './FooterSection';
const Layout = () => {
    return (
        <div class=''>
            <Header />
            <div class='my-5 py-4 px-3 container'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
export default Layout;