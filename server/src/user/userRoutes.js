const express = require('express');
const {
    getProfile,
    addApiKey,
    getApiKey,
    deleteApiKey,
    addLibraryID,
    getLibraryID
} = require('./userController');
const {
    authenticateUser
} = require('../auth/authController');
const router = express.Router();

router.use(authenticateUser);

router.get('/profile', getProfile);
router.post('/addApiKey', addApiKey);
router.get('/getApiKey', getApiKey);
router.post('/deleteApiKey', deleteApiKey);
router.post('/addLibraryID', addLibraryID);
router.get('/getLibraryID', getLibraryID);
module.exports = router;
