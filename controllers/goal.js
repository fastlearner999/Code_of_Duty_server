const Goal = require('../models/Goal');

async function getAll (req, res) {
    try {
        const goals = await Goal.getAll();
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findById (req, res) {
    try {
        const goal = await Goal.findById(req.params.id);
        res.status(200).json(goal);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function findByUserId (req, res) {
    try {
        const userId = req.params.userId;
        const goals = await Goal.findByUserId(userId);
        res.status(200).json(goals);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const goal = await Goal.create(req.body);
        res.status(201).json(goal);
    } catch (err) {
        res.status(422).json({err})
    }
}

async function update (req, res) {
    try {
        const goal = await Goal.update(req.body);
        res.status(202).json(goal);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function destroy (req, res) {
    try {
        await Goal.destroy(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { getAll, findById, findByUserId, create, update, destroy }
