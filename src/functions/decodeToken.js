import jwtDecode from 'jwt-decode';
const decodeToken = (token) => {
    try{
        const output = jwtDecode(token);
        return output;
    }catch(err){
        return null;
    }
}
export default decodeToken;