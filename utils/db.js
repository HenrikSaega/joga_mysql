const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const connection = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("Database connected successfully!");
        return db;
    } catch (error) {
        console.log("Error while connecting with the database");
        throw error;
    }
};
module.exports =  connection;