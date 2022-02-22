const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/home/user/:name/:age", (req, res) => {
    if (req.params.age <= 17)
        res.send(`Hello ${req.params.name}, you're too young`);
    else
        res.send(`Welcome ${req.params.name}, you're ${req.params.age} years old`);
});

app.get("/home/fail/", (req, res) => {
    // Voit lähettää jsonia.
    //res.json({username: 'Kasperi'});
    
    // Send empty response with the status 404 using the status() and sendStatus() methods

    // Status() -menetelmä asettaa vain tilan
    //res.status(404).end();

    //sendStatus() asettaa tilan ja lähettää vastauksen
    res.sendStatus(404);
});

app.get("/home/json/", (req, res) => {
    // Voit lähettää jsonia.
    res.json({username: 'Kasperi'});
});

app.get("/about", (req, res) => {
    res.send("About us...");
});