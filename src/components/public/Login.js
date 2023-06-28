import LoginForm from './LoginForm';
const Login = () => {
    return (
        <div id='login' class='min-vh-100 d-flex justify-content-center
            align-items-center bg-dark text-light'>
            <div class='shadow-lg py-5 px-3 rounded'>
                <h1 class='text-center mb-3'>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}
export default Login;