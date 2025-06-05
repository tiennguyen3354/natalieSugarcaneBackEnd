import loginDb from './../database/loginDb.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv'; 
 
export const getLogin = async (req, res) => { 

    
    dotenv.config({ 
        path: "config.env"
    })
    const { JWT_SECRET }  = process.env
    const { username, password } = req.body; 
    
    const users = await loginDb.getUser(username)

    if (!users) return res.status(401).json({ message: 'Invalid credentials' });
    
    const user = users[0];
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('User from DB:', user);
    
    // if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });
    if (password !== user.password) {  
         return res.status(401).json({ message: 'Invalid credentials' });
    }

 
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
}