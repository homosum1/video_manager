const express = require('express');

const {
  getProfile,
  addApiKey,
  getApiKey,
  deleteApiKey,
  addLibraryID,
  getLibraryID
} = require('./UserController');

const {
    authenticateUser
} = require('../Auth/AuthController');

const router = express.Router();

router.use(authenticateUser);

router.get('/profile', getProfile);

router.post('/addApiKey', addApiKey);
router.get('/getApiKey', getApiKey);
router.post('/deleteApiKey', deleteApiKey);

router.post('/addLibraryID', addLibraryID);
router.get('/getLibraryID', getLibraryID);


module.exports = router;
