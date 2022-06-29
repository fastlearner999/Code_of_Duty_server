const Content = require('../models/Content');

async function getAll (req, res) {
    try {
        const contents = await Content.getAll();
        res.status(200).json(contents)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findById (req, res) {
    try {
        const content = await Content.findById(req.params.id);
        res.status(200).json(content);
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = { getAll, findById }
