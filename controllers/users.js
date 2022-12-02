const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const users = require('../data/users');

const createUser = (req, res) => {
    // Validate the request body and return a 400 Bad Request error if the input is invalid
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Bad Request' });
    }

    // Check if the user already exists and return a 409 Conflict error if the user already exists
    const user = users.find((u) => u.email === req.body.email);
    if (user) return res.status(409).json({ message: 'Conflict' });

    // Create a new user with the given data
    const newUser = new User(
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 10)
    );
    users.push(newUser);

    // Generate a JWT token and return it to the user
    const token = jwt.sign({ id: newUser.id }, 'secret');

    res.json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: token,
    });
}

const authenticateUser = (req, res) => {
    // Validate the request body and return a 400 Bad Request error if the input is invalid
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Bad Request' });
    }

    // Check if the user exists and return a 404 Not Found error if the user does not exist
    const user = users.find((u) => u.email === req.body.email);
    if (!user) return res.status(404).json({ message: 'Not Found' });

    // Compare the given password with the user's password and return a 401 Unauthorized error if the passwords do not match
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate a JWT token and return it to the user
    const token = jwt.sign({ id: user.id }, 'secret');

    res.json({
        token: token,
    });
}

module.exports = {
    createUser,
    authenticateUser
}