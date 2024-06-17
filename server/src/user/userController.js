const jwt = require('jsonwebtoken');
const User = require('./userModel');

const getProfile = async (req, res) => {
    const user = req.user;

    if (!user) res.status(400).json({message: 'Coś poszło nie tak'});
    const userDB = await User.findByPk(user.id);

    if (!userDB) res.status(400).json({message: 'Coś poszło nie tak'});
    const hasApiKey = userDB.apiKey !== null && userDB.apiKey !== '';

    return res.status(200).json({
        username: user.username,
        hasApiKey: hasApiKey,
    });

};

const addApiKey = async (req, res) => {
    const {apiKey} = req.body;
    const {id} = req.user;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Nie znaleziono użytkownika'});
        }

        user.apiKey = apiKey;
        await user.save();

        console.log('API key added');
        return res.status(200).json({message: 'Klucz API został dodany', user});
    } catch (error) {
        console.error('Błąd podczas dodawania klucza API:', error);
        return res.status(500).json({message: 'Coś poszło nie tak'});
    }
};

const getApiKey = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Nie znaleziono użytkownika'});
        }

        const apiKey = user.apiKey;
        if (!apiKey) {
            return res.status(404).json({message: 'Nie znaleziono klucza API'});
        }

        return res.status(200).json({apiKey});
    } catch (error) {
        console.error('Błąd podczas pobierania klucza API:', error);
        return res.status(500).json({message: 'Coś poszło nie tak'});
    }
};

const deleteApiKey = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Nie znaleziono użytkownika'});
        }

        user.apiKey = null;
        await user.save();

        console.log('API key deleted');
        return res.status(200).json({message: 'Klucz API został usunięty'});
    } catch (error) {
        console.error('Błąd podczas usuwania klucza API:', error);
        return res.status(500).json({message: 'Coś poszło nie tak'});
    }
};

const addLibraryID = async (req, res) => {
    const {libraryID} = req.body;
    const {id} = req.user;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Nie znaleziono użytkownika'});
        }

        user.libraryID = libraryID;
        await user.save();

        console.log('Dodane ID biblioteki');
        return res.status(200).json({message: 'ID biblioteki zostało dodane', user});
    } catch (error) {
        console.error('Błąd podczas dodawania ID biblioteki:', error);
        return res.status(500).json({message: 'Coś poszło nie tak'});
    }
};

const getLibraryID = async (req, res) => {
    const {id} = req.user;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Nie znaleziono użytkownika'});
        }

        const libraryID = user.libraryID;
        if (!libraryID) {
            return res.status(404).json({message: 'Nie znaleziono ID biblioteki'});
        }

        return res.status(200).json({libraryID});
    } catch (error) {
        console.error('Błąd podczas pobierania ID biblioteki:', error);
        return res.status(500).json({message: 'Coś poszło nie tak'});
    }
};

module.exports = {
    getProfile,
    addApiKey,
    getApiKey,
    deleteApiKey,
    addLibraryID,
    getLibraryID
};
