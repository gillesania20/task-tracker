const DisplayTasks = () => {
    const content = (
        <div id = 'DisplayTasks'>
            {console.log('content')}
            <div>
                <span>Title</span>
                <span>Status</span>
            </div>
            <div>
                <span>taskone</span>
                <span>Not Completed</span>
            </div>
            <div>
                <span>tasktwo</span>
                <span>Not Completed</span>
            </div>
            <div>
                <span>taskthree</span>
                <span>Completed</span>
            </div>
        </div>
    );
    return content;
}
export default DisplayTasks;