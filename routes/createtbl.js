var express = require('express');
const pg = require('pg');

const config = {
    host: process.env.POSTGRESQL_HOST,
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: process.env.POSTGRESQL_USER,     
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: process.env.POSTGRESQL_PORT,
    ssl: process.env.POSTGRESQL_SSL
};
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const client = new pg.Client(config);

  client.connect(err => {
      if (err) throw err;
      else {
        const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
        `;

        client
            .query(query)
            .then(() => {
                console.log('Table created successfully!');
                res.send('table created successfully');
            })
            .catch(err => console.log(err))
            .then(() => {
                console.log('Finished execution, exiting now');
                process.exit();
            });
        }
  });
});

module.exports = router;
