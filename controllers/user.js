const User = require('../models/User');

async function getAll (req, res) {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findById (req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(422).json({err})
    }
}

async function update (req, res) {
    try {
        const user = await User.update(req.body);
        res.status(202).json(user);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function destroy (req, res) {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        await user.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

async function login (req, res) {
    try {
        const user = await User.login(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({err});
    };
}

async function logout (req, res) {
    try {
        await User.logout(req.body);
        res.status(200).end();
    } catch (err) {
        res.status(401).json({err});
    };
}

module.exports = { getAll, findById, create, update, destroy, login, logout }
