const express = require('express');
const bodyParser = require('body-parser');
const customerQuery = require('./db/customers');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Hae kaikki asiakkaat
app.get("/api/customers", customerQuery.getAllCustomers);

// Hae asiakas tunnuksella. Tunnus lähetetään reittiparametrissa Id
app.get("/api/customers/:id", customerQuery.getCustomerById);

// Lisää uusi asiakas - Uusi asiakas lähetetään pyynnön sisällä.
app.post("/api/customers", customerQuery.addCustomer);

// 	Poista asiakas tunnuksella. Tunnus lähetetään reittiparametrissa Id
app.delete("/api/customers/:id", customerQuery.deleteCustomer);

// Muokkaa asiakasta tunnuksella. 
//Tunnus lähetetään reittiparametrina Id ja päivitettävä asiakas pyynnön sisällä.
app.put("/api/customers/:id", customerQuery.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});