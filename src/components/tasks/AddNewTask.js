import AddNewTaskForm from './AddNewTaskForm';
const AddNewTask = () => {
    return (
        <div id='addNewTask' className='shadow-lg py-5 px-3 rounded'>
            <h1 className='text-center mb-5'>Add new task</h1>
            <AddNewTaskForm />
        </div>
    );
}
export default AddNewTask;