import decodeToken from './decodeToken';
const getTokenRole = (token) => {
    let output = '';
    const userInfo = decodeToken(token);
    if(typeof userInfo.role === 'string'){
        output = userInfo.role;
    }else{
        output = 'unknown'
    }
    return output;
}
export default getTokenRole;