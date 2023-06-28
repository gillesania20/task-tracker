import DeleteUserForm from './DeleteUserForm';
const DeleteUser = () => {
    return (
        <div id='deleteUser' class='shadow-lg py-5 px-3 rounded'>
            <h1 class='text-center mb-5'>Delete user</h1>
            <DeleteUserForm />
        </div>
    );
}
export default DeleteUser;