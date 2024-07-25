const express = require('express');
const mysql = require('mysql2');
const session = require('express-session'); 
const bcrypt = require('bcrypt'); 
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'olive'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});
// view engine  EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My EJS Page'
       
    });
});
app.get('/phase', (req, res) => {
    res.render('phase', {
        title: 'phase',
        phase: 'phaseee',
        text_phase:'lorem Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet'
        
    });
});
app.get('/les_stades',(req,res)=>{
    res.render('les_stades',{
        title:'les_stades'
    })

})
app.get('/phase/phase_01',(req,res)=>{
    res.render('phase',{
        title:'phase 01'
    })

})
app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', {
        title: 'propos_nous'
    });
});
app.get('/sign_in', (req, res) => {
    res.render('sign_in', {
        title: 'sign in'
    });
});
app.get('/inscrire', (req, res) => {
    res.render('inscrire', {
        title: 's\'inscrire'
    });
});
app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', {
        title: 'contactez_nous'
    });
});
app.get('/agenda', (req, res) => {
    // Query months
    db.query('SELECT * FROM months', (err, months) => {
        if (err) throw err;
        
        // Query events
        db.query('SELECT * FROM events', (err, events) => {
            if (err) throw err;
            
            // Render EJS template with data
            res.render('partials/agenda', {
                title: 'Agenda',
                months: months,
                events: events
            });
        });
    });
});

app.post('/events', (req, res) => {
    const { stade, col, month } = req.body;
    const sql = 'INSERT INTO agenda_events (stade, col, month) VALUES (?, ?, ?)';
    db.query(sql, [stade, col, month], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
});


// :::::::::: post ::::::::::::::
// app.post('/inscrire', async (req, res) => {
//     const { nom, email, password } = req.body; 
//     const userRole = 'user';
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
//     db.query(sql, [nom, email, hashedPassword, userRole], (err, result) => {
//         if (err) return res.status(500).json({ error: 'Database error' });
//         res.status(201).json({ message: 'User registered' });
//     });
// });
app.post('/inscrire', async (req, res) => {
    const { nom, email, password } = req.body;

    // Check if the email already exists
    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (results.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Set default role to 'user'
        const userRole = 'user';

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, hashedPassword, userRole], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'User registered' });
        });
    });
});


  app.post('/log_in', (req, res) => {
    const { email, password } = req.body;

    // Query to find the user by email
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid email or password' });

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
