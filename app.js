const path = require('path');
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const chalk = require('chalk');

dotenv.config({ path: './config/config.env' });
const passportSetup = require('./config/passport-setup');
const connectDB = require('./config/db/mongoose');

const indexRoutes = require('./routes/indexRoutes');
connectDB();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    chalk.blue.bold.underline(
      `Server running in ${process.env.NODE_ENV} mode on port:${PORT} `
    )
  )
);
