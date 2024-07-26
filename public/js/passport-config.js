const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // for password comparison, even if you don't use it

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'olive'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database con');
});

module.exports = function(passport) {
    
    passport.use(new LocalStrategy(
        async (email, password, done) => {
            // Check if the user exists
            console.log('3iiiiiiiiiiiiw');
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
                if (err) 
                    {
                       
                        return done(err);
                    }
                if (results.length === 0){  return done(null, false, { message: 'Invalid email or password' });}

                const user = results[0];
                // Here you can use bcrypt to compare passwords if hashed passwords are used
                // const isMatch = await bcrypt.compare(password, user.password);
                const isMatch = password === user.password; // Simplified password check

                if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return done(err);
            done(null, results[0]);
        });
    });
};
