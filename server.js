const express = require('express');
const serveIndex = require('serve-index');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const User = require('./user');
mongoose.set("strictQuery", false);


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost:27017/DatabaseVoitureElec', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Login

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log('Incorrect username')
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Incorrect password')
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      console.log("Error while logging in")
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err, null);
  }
});

app.use(express.static('public'));
app.use('/public', serveIndex('public', {'icons': true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public'+'/index.html');
});

app.get('/app', checkAuthenticated, (req, res) => {
  res.sendFile(__dirname+'/public'+'/app.html')
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname+'/public'+'/register.html');
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    console.log('User added, redirecting to login page...')
    res.redirect('/');
  } catch (err) {
    console.log('/!\ Error, redirecting to register page...')
    res.redirect('/register');
  }
});

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/app',
  failureRedirect: '/',
  failureFlash: true
}));

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    res.redirect("/")
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/app');
  }
  next();
}

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));

module.exports = mongoose.connection;