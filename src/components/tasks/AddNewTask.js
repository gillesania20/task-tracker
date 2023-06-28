import AddNewTaskForm from './AddNewTaskForm';
const AddNewTask = () => {
    return (
        <div id='addNewTask' class='shadow-lg py-5 px-3 rounded'>
            <h1 class='text-center mb-5'>Add new task</h1>
            <AddNewTaskForm />
        </div>
    );
}
export default AddNewTask;