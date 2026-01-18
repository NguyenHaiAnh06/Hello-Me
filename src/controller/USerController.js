// TT nguoi dung
const bcrypt = require('bcrypt');
const db = require('../database/conn');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        return res.json({ message: '❌ Thiếu dữ liệu' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

        db.query(sql, [username, email, hashedPassword], (err) => {
            if (err) {
                console.error(err);
                return res.json({ message: '❌ Lỗi đăng ký' });
            }

            res.json({ message: '✅ Đăng ký thành công' });
        });


    } catch (err) {
        console.error(err);
        res.json({ message: '❌ Lỗi server' });
    }
};
