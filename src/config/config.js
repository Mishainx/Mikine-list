import dotenv from 'dotenv'

dotenv.config();

export default{
    PORT: process.env.SERVER_PORT  || 8080,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_CLUSTER: process.env.DB_CLUSTER,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ENVIROMENT: process.argv.includes("prod")? "PROD" : "DEV"
}