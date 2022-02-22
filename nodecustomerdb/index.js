const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Hae kaikki asiakkaat
app.get("/api/customers", query.getAllCustomers);

// Hae asiakas tunnuksella. Tunnus lähetetään reittiparametrissa Id
app.get("/api/customers/:id", query.getCustomerById);

// Lisää uusi asiakas - Uusi asiakas lähetetään pyynnön sisällä.
app.post("/api/customers", query.addCustomer);

// 	Poista asiakas tunnuksella. Tunnus lähetetään reittiparametrissa Id
app.delete("/api/customers/:id", query.deleteCustomer);

// Muokkaa asiakasta tunnuksella. 
//Tunnus lähetetään reittiparametrina Id ja päivitettävä asiakas pyynnön sisällä.
app.put("/api/customers/:id", query.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});