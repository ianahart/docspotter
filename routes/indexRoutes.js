const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');

const {
  getHomePage,
  getFindDoctorPage,
  authRedirect,
  getAboutPage,
  getHelpPage,
  submitForm,
  notFound,
  logout,
  login,
} = require('../controllers/indexControllers');
const router = express.Router();

router.route('/').get(getHomePage);
router.route('/find-doctor').get(getFindDoctorPage);
router.route('/search-doctor').post(submitForm);
router.route('/about').get(getAboutPage);
router.route('/help').get(getHelpPage);
//////////////////////////////////////////
// Auth login
router.route('/auth/login').get(login);

// Auth logout
router.route('/auth/logout').get(logout);

// Auth with google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router
  .route('/auth/google/redirect')
  .get(passport.authenticate('google'), authRedirect);
/////////////////////////////////////////
router.route('*').get(notFound);

module.exports = router;
