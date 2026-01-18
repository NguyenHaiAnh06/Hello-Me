const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../templates')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/TT_khach.html'));
});
const userRouter = require('./routes/user.route');
app.use('/api/users', userRouter);

app.listen(3000, () => {
    console.log('🚀 Server thuyết trình: http://localhost:3000');
});