const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/api/users", require("./routes/user"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/tasks", require("./routes/task"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
