const fetch = require('node-fetch');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config({ path: './config/config.env' });

exports.getHomePage = (req, res, next) => {
  res.render('homePage', {
    pageTitle: 'Home',
    link: res.locals.link,
    status: res.locals.status,
    user: req.user,
  });
};

exports.getFindDoctorPage = (req, res, next) => {
  res.render('findDoctorPage', {
    pageTitle: 'FindDoctor',
    docData: '',
    errors: '',
    user: req.user,
  });
};

exports.getAboutPage = (req, res, next) => {
  res.render('aboutPage', {
    pageTitle: 'About',
    user: req.user,
  });
};

exports.getHelpPage = (req, res, next) => {
  res.render('helpPage', {
    pageTitle: 'Help',
    user: req.user,
  });
};

exports.submitForm = (req, res, next) => {
  const { street, city, zipcode, state } = req.body;
  const errors = [];
  if (!city || !state) {
    errors.push({ text: 'Please provide a city and a state' });
  }

  if (errors.length > 0) {
    return res.render('findDoctorPage', {
      errors,
      pageTitle: 'FindDoctor',
      docData: '',
      user: req.user,
    });
  }
  const formattedAddress = [street, city, zipcode, state].join(' ');
  const yelpEndPoint = `/businesses/search?term=doctors&location=${formattedAddress}`;
  const findDoctors = async () => {
    try {
      const response = await fetch(process.env.YELP_BASE_URL + yelpEndPoint, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + process.env.YELP_API_KEY },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  findDoctors().then((data) => {
    res.render('findDoctorPage', {
      pageTitle: 'Find Doctor',
      docData: data.businesses,
      results: data.businesses.length,
      errors: '',
      user: req.user,
    });
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

exports.login = (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login',
  });
};

exports.authRedirect = (req, res, next) => {
  res.redirect('/');
};

exports.notFound = (req, res, next) => {
  res.render('notFound', {
    pageTitle: '404 | Not Found',
  });
};
