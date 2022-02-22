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
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year:  req.body.year
    });

    try {
        const newCar = await car.save();
        res.status(201).json({ newCar });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
});

// Poista auto id:n mukaan.
router.delete("/cars", async (req, res) => {
    await Car.findByIdAndDelete(req.body.id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
          }
        else {
            res.status(200).json(result);
        }
    });
});

// Muokkaa autoa tunnuksen (id) mukaan. 
// Tunnus lähetetään reittiparametrissa ja päivitetyt tiedot autosta pyynnön runko-osassa.
router.put("/cars/:id", async (req, res) => {
    await Car.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, (err, result) => { 
      if (err){ 
        return res.status(500).json({ message: err.message });
      } 
      else{ 
        res.status(200).json({ result });
      } 
    }); 
});

module.exports = router;