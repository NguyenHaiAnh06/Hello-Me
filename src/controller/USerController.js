// TT nguoi dung
const express = require("express");
const router = express.Router();

const db = require("../database/conn");

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Lỗi đăng ký thành viên" });
        }
        return res.status(200).json({ message: "Đăng ký thành công!" });
    });
});
module.exports = router;

