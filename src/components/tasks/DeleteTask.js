import DeleteTaskForm from './DeleteTaskForm';
const DeleteTask = () => {
    return (
        <div id='deleteTask' class='shadow-lg py-5 px-3 rounded'>
            <h1 class='text-center mb-5'>Delete task</h1>
            <DeleteTaskForm />
        </div>
    );
}
export default DeleteTask;