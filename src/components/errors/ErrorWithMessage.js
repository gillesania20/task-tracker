const ErrorWithMessage = ({message}) => {
    return (
        <div class='shadow-lg py-5 px-3 rounded text-center'>
            <div>
                oops something went wrong.
            </div>
            <div>
                {message}{'.'}
            </div>
        </div>
    );
}
export default ErrorWithMessage;