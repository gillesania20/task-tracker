const AddNewTask = () => {
    return (
        <div id = 'AddNewTask'>
            <div>
                <input type='text' placeholder='Title' />
            </div>
            <div>
                <textarea placehoder='Body'></textarea>
            </div>
            <div>
                <button>Add Task</button>
            </div>
        </div>
    );
}
export default AddNewTask;