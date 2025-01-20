const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER, // Your Postgres user
    host: process.env.DB_HOST, // Your Postgres host
    database: process.env.DB_DATABASE, // Your Postgres database
    password: process.env.DB_PASSWORD, // Your Postgres password
    port: process.env.DB_PORT, // Your Postgres port
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};