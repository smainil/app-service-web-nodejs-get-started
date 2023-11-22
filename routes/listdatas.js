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
        const query = 'SELECT * FROM inventory;';

        client
            .query(query)
            .then(() => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                    res.send(`Read: ${JSON.stringify(row)}`);
                });
    
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
