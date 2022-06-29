const Test = require('../models/Test');

async function getAll (req, res) {
    try {
        const test = await Test.getAll();
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { getAll }