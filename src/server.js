// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
const fs = require('fs');


app.get('/descriptions/:x_unit', (req, res) => {
  fs.readFile('./data_prep/description_list.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).send(err);
    }
    
    const jsonData = JSON.parse(data);
    const matchingData = jsonData.filter(item => item.x_unit === req.params.x_unit);
    res.json(matchingData);
  }); 
});
app.get('/descriptions', (req, res) => {
  fs.readFile('./data_prep/description_list.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).send(err);
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
  });
});
// let db = new sqlite3.Database('./data_prep/negadijumi2.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the SQLite database.');
// });

// app.get('/descriptions-olf', (req, res) => {
//   let sql = `SELECT * FROM descriptions`;

//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json(rows);
//   });
// });

// app.get('/api/related-data/:id', (req, res) => {
//   let sql = `SELECT * FROM data WHERE description_id = ?`;

//   db.all(sql, [req.params.id], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json(rows);
//   });
// });


app.get('/api/related-data/:database/:id', (req, res) => {
  db = new sqlite3.Database('./data_prep/parsed_data/' + req.params.database, (err) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Error connecting to the database');
      }
      console.log('Connected to the SQLite database.');
  });

  let sql = `SELECT * FROM data WHERE description_id = ?`;
  db.all(sql, [req.params.id], (err, rows) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Error executing query');
      }
      res.json(rows);
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});