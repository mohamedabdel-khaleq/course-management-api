const fs = require("fs");
const express = require("express");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/course", courseRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});