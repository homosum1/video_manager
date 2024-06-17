const express = require('express');

const {
  loginUser,
  logoutUser,
  signupUser,
  isLoggedIn,
  authenticateUser
} = require('./authController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/signup', signupUser);
router.get('/isLoggedIn', authenticateUser, isLoggedIn);

module.exports = router;
