var express = require('express');
const basicAuth = require('express-basic-auth');
var router = express.Router();

// const authenticate = require('../middleware/authenticate');
const {checkIfAuth} = require('../middleware/checkIfAuth');

/* Authenticated route */

router.use(basicAuth({
  users: { 'admin': 'secretPassword' },
  challenge: true,
  unauthorizedResponse: (req, res) => {
    return `<h1>Unauthorised access. Please login</h1>`
    // res.render('error');
  }
}));
// Following is to log the req headers (the authorization part)
// and the req.auth that was set by the basicAuth middleware 
// router.use(checkIfAuth); // don't need to add this here. 
// Have included it in app.js for all routes

// All routes after this will be protected
router.get('/',function(req, res, next) {
  res.render('users', {title: 'Users Page'});
});

// router.get('/logout',function(req, res, next) {
//   // req.headers['authorization'] = undefined;
//   // req.auth = undefined;
//   // console.log("req.headers.authorization after logout is:", req.headers.authorization);
//   // res.status(401).send('Logged out')
//   res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     return res.sendStatus(401);
// });

module.exports = router;
