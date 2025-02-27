const db = require('./dbconfig');

// Hae kaikki asiakkaat
const getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customers', (err, result) => {
  if (err)
    console.error(err);
  else
    res.json(result.rows);
  });
}

// Hae asiakas tunnuksella. 
// Tunnus lähetetään reittiparametrissa Id.
const getCustomerById = (req, res) => {
const query = {
  text: 'SELECT * FROM customers WHERE id = $1',
  values: [req.params.id],
}

db.query(query, (err, result) => {
  if (err) {
    return console.error('Error executing query', err.stack);
  }
  else {
    if (result.rows.length > 0)
      res.json(result.rows);
    else
      res.status(404).end();
  }
 });
}

// Lisää uusi asiakas - Uusi asiakas lähetetään pyynnön sisällä.
const addCustomer = (req, res) => {
    // Erotellaan asiakas pyynnön rungosta.
    const newCustomer = req.body;
    
    const query = {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone],
    };

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });
    
    res.json(newCustomer);
}

// Poista asiakas tunnuksella. Tunnus lähetetään reittiparametrissa Id
const deleteCustomer = (req, res) => {
    // Poista asiakas
    const query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id],
    };

    db.query(query, (err, res) => {
        if (err) {
            return console.log('Error executing query', err.stack);
        }
    });
    res.status(204).end();
}

// Muokkaa asiakasta tunnuksella. 
// Tunnus lähetetään reittiparametrina Id ja päivitettävä asiakas pyynnön sisällä.
const updateCustomer = (req, res) => {
    // Muokkaa asiakasta pyynnön rungosta.
    const editedCustomer = req.body;

    const query = {
        text: 'UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5',
        values: [editedCustomer.firstname, editedCustomer.lastname, editedCustomer.email, editedCustomer.phone, req.params.id],
    };

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });
    
    res.json(editedCustomer);
}

module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomerById: getCustomerById,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer,
}