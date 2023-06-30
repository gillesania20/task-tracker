const ErrorWithMessage = ({message}) => {
    return (
        <div className='shadow-lg py-5 px-3 rounded text-center'>
            <div>
                oops something went wrong.
            </div>
            <div className='text-danger'>
                {message}{'.'}
            </div>
        </div>
    );
}
export default ErrorWithMessage;