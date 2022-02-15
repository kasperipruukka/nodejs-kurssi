const express = require('express');

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// app.post("/hello", (req, res) => {
//     res.send("Hello World!");
// });

app.all("/hello", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});