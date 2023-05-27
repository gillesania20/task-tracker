const EditTask = () => {
    return (
        <div id = 'EditTask'>
            <div><span>Title:</span></div>
            <div>
                <input type='text' placeholder ='Title'
                    value='titleone' />
            </div>
            <div><span>Body:</span></div>
            <div>
                <textarea placeholder='Body'>body one.</textarea>
            </div>
            <div>
                <span>Status:</span>
                <span>
                    <input type='checkbox' checked = {true}/>
                </span>
            </div>
            <div>
                <button>Edit</button>
            </div>
        </div>
    );
}
export default EditTask;