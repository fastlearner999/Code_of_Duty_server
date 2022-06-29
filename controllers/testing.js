const Testing = require('../models/Testing');

async function getAll (req, res) {
    try {
        const testing = await Testing.getAll();
        res.status(200).json(testing);
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { getAll }