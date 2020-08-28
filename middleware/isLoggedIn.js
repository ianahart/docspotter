const isLoggedIn = (req, res, next) => {
  if (req.query.prompt === 'consent') {
    res.cookie('user', req.query.prompt);
  }

  if (req.cookies.user === 'consent') {
    res.locals.status = 'Logout';
    res.locals.link = 'logout';
  } else {
    res.locals.status = 'Login';
    res.locals.link = 'google';
  }

  next();
};

module.exports = isLoggedIn;
