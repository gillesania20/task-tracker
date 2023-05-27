const EditUser = () => {
    return (
        <div id = 'EditUser'>
            <div>
                <span>Username:</span>
            </div>
            <div>
                <span>Leave password empty if you will not change
                    password
                </span>
            </div>
            <div>
                <span>Password:</span>
            </div>
            <div>
                <input type='password' />
            </div>
            <div>
                <span>Retype Password</span>
            </div>
            <div>
                <input type='password' />
            </div>
            <div>
                <button>Edit User</button>
            </div>
        </div>
    );
}
export default EditUser;