const { Pool } = require("pg");
const crypto = require("crypto-js");

const pass = JSON.parse(crypto.AES.decrypt(process.env.DATABASE_PASSWORD, process.env.SALT).toString(crypto.enc.Utf8)); 

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: pass
});

module.exports = pool;