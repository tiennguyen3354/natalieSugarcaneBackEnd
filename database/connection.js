import mysql from 'mysql2/promise';
import dotenv from 'dotenv'; 

dotenv.config({ 
    path: "config.env"
})

// read in our env 
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env; 

// connect to the db
const connect = await mysql.createConnection({ 
    host: DB_HOST, 
    port: DB_PORT,
    database: DB_DATABASE, 
    user: DB_USER, 
    password: DB_PASSWORD
})
console.log("connected to the inventory database")
export default connect; 
