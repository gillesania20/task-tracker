import RegisterForm from './RegisterForm';
const Register = () => {
    return (
        <div id='register' class='bg-dark text-light min-vh-100
            d-flex justify-content-center align-items-center'>
            <div class='shadow-lg py-5 px-3 rounded'>
                <h1 class='text-center mb-3'>Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
export default Register;