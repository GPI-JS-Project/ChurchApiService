const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'gpijalansuci.org',
    user: 'u1579656_jaktim_2024',
    password: 'jaktim@2024',
    database: 'u1579656_jaktim'
});

// Routes
app.get('/birthday', (req, res) => {
    db.query('SELECT * FROM v_GreetingNotificationBirthday', (err, results) => {
        if (err) {
            throw err;
        }
        let birthday = {
            today: [],
            tomorrow: [],
            yesterday: [],
            thisMonth: [],
            nextMonth: []

        };
        birthday.today = results.filter(item => item.desc == "Today");
        birthday.tomorrow = results.filter(item => item.desc == "Tomorrow");
        birthday.yesterday = results.filter(item => item.desc == "Yesterday");
        birthday.thisMonth = results.filter(item => item.desc == "ThisMonth");
        birthday.nextMonth = results.filter(item => item.desc == "NextMonth");


        res.json(birthday);
    });
});

app.get('/annyversary', (req, res) => {
    db.query('SELECT * FROM v_GreetingNotificationAnniversary', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

// Add more routes for CRUD operations as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create
app.post('/birthday', (req, res) => {
    const {
        name,
        email
    } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User added successfully');
    });
});

// Read single user
app.get('/birthday/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM v_GreetingNotificationBirthday WHERE churchID = ?', userId, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result[0]);
    });
});

// Update
app.put('/birthday/:id', (req, res) => {
    const userId = req.params.id;
    const {
        name,
        email
    } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User updated successfully');
    });
});

// Delete
app.delete('/birthday/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User deleted successfully');
    });
});