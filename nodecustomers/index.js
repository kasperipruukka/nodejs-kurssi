const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 3000;

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
];

// Hae kaikki asiakkaat
app.get("/api/customers", (req, res) => {
    res.json(customers);
});

// Hae asiakas tunnuksella. 
// Tunnus lähetetään reittiparametrissa.
app.get("/api/customers/:id", (req, res) => {
    const customerId = req.params.id;
    const customer = customers.filter(customer => customer.id === customerId);  

    if (customer.length > 0)
        res.json(customer);
    else
        res.status(404).end();
});

// Lisää uusi asiakas
app.post("/api/customers", (req, res) => {
    // Erotellaan asiakas pyynnön sisältä ja luodaan ID.
    const newCustomer = {'id': Date.now(), ...req.body};

    // Lisätään uusi asiakas taulukon loppuun.
    customers = [...customers, newCustomer];
    res.json(newCustomer);
});

// Poista asiakas tunnuksella.
// Tunnus lähetetään reittiparametrissa.
app.delete("/api/customers/:id", (req, res) => {
    const id = req.params.id;

    customers = customers.filter(customer => customer.id !== id);
    res.status(204).end();
});

// Muokkaa asiakasta tunnuksella.
// Tunnus lähetetään reittiparametrina ja päivitettävä asiakas pyynnön runko-osan sisällä.
app.put("/api/customers/:id", (req, res) => { 
    const customerId = req.params.id;
    const updatedCustomer = {'id': customerId, ...req.body};

    // Haetaan päivitettävän asiakkaan indeksi.
    const index = customers.findIndex(customer => customer.id === customerId);
    // Korvataan päivitetty asiakas taulukosta.
    customers.splice(index, 1, updatedCustomer);
    res.json(updatedCustomer);
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});