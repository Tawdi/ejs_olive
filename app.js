// const express = require('express');
// const mysql = require('mysql');
// const app = express();

// // Set the view engine to EJS
// app.set('view engine', 'ejs');

// // Create a MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'yourUsername',
//     password: 'yourPassword',
//     database: 'yourDatabase'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the MySQL database!');
// });

// app.get('/', (req, res) => {
//     const query = 'SELECT * FROM yourTable';
    
//     connection.query(query, (err, results) => {
//         if (err) throw err;
        
//         // Render the template and pass the data
//         res.render('index', {
//             title: 'My EJS Page with MySQL Data',
//             data: results
//         });
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// view engine  EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My EJS Page',
        name: 'Ahmed',
        items: ['Item 1', 'Item 2', 'Item 3']
    });
});
app.get('/phase', (req, res) => {
    res.render('phase', {
        title: 'phase',
        phase: 'phaseee',
        text_phase:'lorem Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet'
        
    });
});
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
    res.render('partials/agenda', {
        title: 'agenda'
    });
});
// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
