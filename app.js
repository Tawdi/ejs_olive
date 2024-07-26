/*
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressLayouts = require('express-ejs-layouts');
const app = express();

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

// View engine EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Session and Passport setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy((email, password, done) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false, { message: 'Incorrect email.' });

        const user = results[0];
        if (password === user.password) return done(null, user); // Check plain text password
        return done(null, false, { message: 'Incorrect password.' });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);
    });
});

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/sign_in');
    }
}

app.get('/', (req, res) => {
    res.render('index', { title: 'My EJS Page' });
});

app.get('/les_stades', isAuthenticated, (req, res) => {
    res.render('les_stades', { title: 'les_stades' });
});

app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', { title: 'propos_nous' });
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in', { title: 'sign in' });
});

app.get('/inscrire', (req, res) => {
    res.render('inscrire', { title: 's\'inscrire' });
});

app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', { title: 'contactez_nous' });
});

app.get('/agenda', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM months', (err, months) => {
        if (err) throw err;

        db.query('SELECT * FROM events', (err, events) => {
            if (err) throw err;

            res.render('partials/agenda', {
                title: 'Agenda',
                months: months,
                events: events
            });
        });
    });
});

app.post('/inscrire', (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error. Please try again later.' });

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        const userRole = 'user';
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, password, userRole], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error. Please try again later.' });
            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

app.post('/log_in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (user.role === 'admin') {
            res.render('admin/admin', { title: 'Admin Page' });
        } else {
            res.render('index', { title: 'Accueil Index' });
        }
    })(req, res, next);
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/
/*
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressLayouts = require('express-ejs-layouts');
const app = express();

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

// View engine EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Session and Passport setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy((email, password, done) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false, { message: 'Incorrect email.' });

        const user = results[0];
        if (password === user.password) return done(null, user); // Check plain text password
        return done(null, false, { message: 'Incorrect password.' });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);
    });
});

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/sign_in');
    }
}

app.get('/', (req, res) => {
    res.render('index', { title: 'My EJS Page' });
});

app.get('/les_stades', isAuthenticated, (req, res) => {
    res.render('les_stades', { title: 'les_stades' });
});

app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', { title: 'propos_nous' });
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in', { title: 'sign in' });
});

app.get('/inscrire', (req, res) => {
    res.render('inscrire', { title: 's\'inscrire' });
});

app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', { title: 'contactez_nous' });
});

app.get('/agenda', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM months', (err, months) => {
        if (err) throw err;

        db.query('SELECT * FROM events', (err, events) => {
            if (err) throw err;

            res.render('partials/agenda', {
                title: 'Agenda',
                months: months,
                events: events
            });
        });
    });
});

app.post('/inscrire', (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error. Please try again later.' });

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        const userRole = 'user';
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, password, userRole], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error. Please try again later.' });
            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

app.post('/log_in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (user.role === 'admin') {
            res.render('admin/admin', { title: 'Admin Page' });
        } else {
            res.render('index', { title: 'Accueil Index' });
        }
    })(req, res, next);
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/
/*
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressLayouts = require('express-ejs-layouts');
const app = express();
const passportConfig = require('./public/js/passport-config');
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

// View engine EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Session and Passport setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
// passport.use(new LocalStrategy((email, password, done) => {
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//         if (err) return done(err);
//         if (results.length === 0) return done(null, false, { message: 'Incorrect email.' });

//         const user = results[0];
//         if (password === user.password) return done(null, user); // Check plain text password
//         return done(null, false, { message: 'Incorrect password.' });
//     });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
//         if (err) return done(err);
//         done(null, results[0]);
//     });
// });
passportConfig(passport); // Initialize passport configuration
app.use(passport.initialize());
app.use(passport.session());
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/sign_in');
    }
}

app.get('/', (req, res) => {
    res.render('index', { title: 'My EJS Page' });
});

app.get('/les_stades', isAuthenticated, (req, res) => {
    res.render('les_stades', { title: 'les_stades' });
});

app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', { title: 'propos_nous' });
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in', { title: 'sign in', error: req.query.error });
});

app.get('/inscrire', (req, res) => {
    res.render('inscrire', { title: 's\'inscrire', error: req.query.error });
});

app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', { title: 'contactez_nous' });
});

app.get('/agenda', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM months', (err, months) => {
        if (err) throw err;

        db.query('SELECT * FROM events', (err, events) => {
            if (err) throw err;

            res.render('partials/agenda', {
                title: 'Agenda',
                months: months,
                events: events
            });
        });
    });
});

app.post('/inscrire', (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.redirect(`/inscrire?error=${encodeURIComponent('All fields are required.')}`);
    }

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) return res.redirect(`/inscrire?error=${encodeURIComponent('Database error. Please try again later.')}`);

        if (results.length > 0) {
            return res.redirect(`/inscrire?error=${encodeURIComponent('Email already in use.')}`);
        }

        const userRole = 'user';
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, password, userRole], (err, result) => {
            if (err) return res.redirect(`/inscrire?error=${encodeURIComponent('Database error. Please try again later.')}`);
            res.redirect('/sign_in?message=User registered successfully.');
        });
    });
});

app.post('/log_in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.redirect(`/sign_in?error=${encodeURIComponent(info.message)}`);
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (user.role === 'admin') {
            res.redirect('/admin_page');
        } else {
            res.redirect('/');
        }
    })(req, res, next);
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session); // To use MySQL as session store
const app = express();
const expressLayouts = require('express-ejs-layouts');
const passportConfig = require('./public/js/passport-config'); // Import your passport configuration

const db = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'olive'
};

// Create a session store
const sessionStore = new MySQLStore(dbOptions);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false } // Set to true if using HTTPS
}));

passportConfig(passport); // Initialize passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Your routes here
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/sign_in');
    }
}

app.get('/', (req, res) => {
    res.render('index', { title: 'My EJS Page' });
});

app.get('/les_stades', isAuthenticated, (req, res) => {
    res.render('les_stades', { title: 'les_stades' });
});

app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', { title: 'propos_nous' });
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in', { title: 'sign in', error: req.query.error });
});

app.get('/inscrire', (req, res) => {
    res.render('inscrire', { title: 's\'inscrire', error: req.query.error });
});

app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', { title: 'contactez_nous' });
});

app.get('/agenda', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM months', (err, months) => {
        if (err) throw err;

        db.query('SELECT * FROM events', (err, events) => {
            if (err) throw err;

            res.render('partials/agenda', {
                title: 'Agenda',
                months: months,
                events: events
            });
        });
    });
});
app.post('/inscrire', (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.redirect(`/inscrire?error=${encodeURIComponent('All fields are required.')}`);
    }

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) return res.redirect(`/inscrire?error=${encodeURIComponent('Database error. Please try again later.')}`);

        if (results.length > 0) {
            return res.redirect(`/inscrire?error=${encodeURIComponent('Email already in use.')}`);
        }

        const userRole = 'user';
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, password, userRole], (err, result) => {
            if (err) return res.redirect(`/inscrire?error=${encodeURIComponent('Database error. Please try again later.')}`);
            res.redirect('/sign_in?message=User registered successfully.');
        });
    });
});

app.post('/log_in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.redirect(`/sign_in?error=${encodeURIComponent(info.message)}`);
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (user.role === 'admin') {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    })(req, res, next);
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

*/

const express = require('express');
const session = require('express-session');
// const passport = require('passport');
const mysql = require('mysql2');
const expressLayouts = require('express-ejs-layouts');
// const passportConfig = require('./public/js/passport-config'); // Import your passport configuration

const app = express();

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'olive'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware with in-memory store
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport and use session
// passportConfig(passport); // Initialize passport configuration
// app.use(passport.initialize());
// app.use(passport.session());

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/sign_in'); // Redirect to login page if not authenticated
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'My EJS Page' });
});

app.get('/les_stades', isAuthenticated, (req, res) => {
    res.render('les_stades', { title: 'les_stades' });
});

app.get('/propos_nous', (req, res) => {
    res.render('propos_nous', { title: 'propos_nous' });
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in', { title: 'Sign In' });
});

app.get('/inscrire', (req, res) => {
    res.render('inscrire', { title: 'S\'inscrire' });
});

app.get('/contactez_nous', (req, res) => {
    res.render('contactez_nous', { title: 'Contactez Nous' });
});

app.get('/agenda', isAuthenticated, (req, res) => {
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
app.post('/log_in', (req, res) => {
    const { email, password } = req.body; // Récupérer les données du formulaire
  
    // Correction de la requête SQL
    const sql = 'SELECT role FROM users WHERE email = ? AND password = ?  ';
  
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error('Erreur lors de la requête de connexion :', err);
        return res.status(500).send('Erreur lors de la connexion : ' + err.message);
      }
  
  
      if (results.length > 0) {
        const  user = results[0];
    
        const role = results[0].role;
  
        // Vérifiez l'état de l'utilisateur
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        // Si l'utilisateur est actif, procédez à la redirection en fonction du rôle
        if (role === 'admin') {
          return res.redirect('/agenda'); // Redirection vers agenda.ejs pour les admins
        } else {
          return res.redirect('/'); // Redirection vers accueil.ejs pour les utilisateurs normaux
        }
      } else {
        // Aucun utilisateur trouvé avec les identifiants fournis
        return res.send('Identifiants incorrects'); // Gérer le cas où aucun utilisateur correspondant n'est trouvé
      }
    });
});


app.post('/inscrire', async (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Insert new user into database
        const userRole = 'user'; // Default role
        const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [nom, email, password, userRole], (err) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
