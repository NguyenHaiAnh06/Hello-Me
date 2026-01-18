const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

conn.connect(err => {
    if (err) {
        console.log('❌ Lỗi kết nối MySQL:', err.message);
        return;
    }
    console.log('✅ Kết nối MySQL thành công');
});

module.exports = conn;