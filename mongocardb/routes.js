const express = require('express');
const router = express.Router();
const Car = require('./models/car');

// Hae kaikki autot.
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars)
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
});

// Lisää uusi auto. Uusi auto lähetetään pyynnön runko-osassa.
router.post("/cars", async (req, res) => {

})

module.exports = router;