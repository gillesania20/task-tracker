import {
    Outlet
} from 'react-router-dom';
import Header from './HeaderSection';
import Footer from './FooterSection';
const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
export default Layout;