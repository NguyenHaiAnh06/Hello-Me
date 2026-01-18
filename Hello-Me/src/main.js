const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../templates")));
const userRouter = require("./controller/UserController");
app.use("/", userRouter);
app.listen(3000, () => {
    console.log("Server chạy ở http://localhost:3000");
});
