const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const SECRET_KEY = 'dummy-key';

const generateJWT = (user) => {
    const userData = {
        id: user.id,
        username: user.username
    };

    return jwt.sign({user: userData}, SECRET_KEY, {expiresIn: '1h'});
};

const authenticateUser = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({message: 'Nieautoryzowany dostęp'});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Nieautoryzowany dostęp'});
    }
};

const loginUser = async (req, res) => {
    console.log('login attempt');
    const {username, password} = req.body;

    const user = await User.findOne({where: {username, password}});

    if (user) {
        const token = generateJWT(user);
        console.log(token);
        res.cookie('authToken', token, {
            httpOnly: true, sameSite: 'strict'
        });

        console.log(`zalogowanie użytkownika: ${user.email}`);
        return res.status(200).json({message: 'Zalogowano', user});
    } else {
        return res.status(401).json({message: 'Nieprawidłowa nazwa użytkownika lub hasło'});
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('authToken', {httpOnly: true, secure: false});
    return res.status(200).json({message: 'Logout successful'});
};

const signupUser = async (req, res) => {
    const {username, email, password} = req.body;

    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
        return res.status(409).json({message: 'Użytkownik o danym adresie email już istnieje'});
    }

    const newUser = await User.create({username, email, password, apiKey: null, libraryID: null});


    const token = generateJWT(newUser);
    console.log(token);
    res.cookie('authToken', token, {
        httpOnly: true, sameSite: 'strict'
    });

    return res.status(201).json({message: 'Zostałeś zarejestrowany!', user: newUser});
};

const isLoggedIn = async (req, res) => {
    console.log(req.user.id);
    const user = await User.findByPk(req.user.id);
    return res.status(200).json({message: 'Uzytkownik zalogowany', user});
};

module.exports = {
    authenticateUser,
    loginUser,
    logoutUser,
    signupUser,
    isLoggedIn,
};
