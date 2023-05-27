const Register = () => {
    return (
        <div id = 'Register'>
            <div>
                <input type='text' placeholder = 'Username' />
            </div>
            <div>
                <input type='password' placeholder='Password' />
            </div>
            <div>
                <input type='password' placeholder='Confirm Password' />
            </div>
            <div>
                <button>Register</button>
            </div>
        </div>
    );
}
export default Register;