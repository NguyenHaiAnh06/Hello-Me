const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Haianh2006@',
    database: 'haianh_software'
});
connection.connect((err) => {
    if (err) {
        console.error('Không thể kết nối MySQL: ' + err.message);
        return;
    }
    console.log('Đã kết nối thành công tới Database: haianh_software');
});
module.exports = connection;