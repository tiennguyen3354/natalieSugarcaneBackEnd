import connection from './connection.js'

const getUser = async (username) => { 
    const [result] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (result.length === 0) {
        return null;
    } else { 
        return result; 
    }
}

export default {getUser}