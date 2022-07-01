const Workout = require('../models/Workout');

async function getAll (req, res) {
    try {
        const workouts = await Workout.getAll();
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findById (req, res) {
    try {
        const workout = await Workout.findById(req.params.id);
        res.status(200).json(workout);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function findByUserId (req, res) {
    try {
        const userId = req.params.userId;
        const workouts = await Workout.findByUserId(userId);
        res.status(200).json(workouts);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        res.status(422).json({err})
    }
}

async function update (req, res) {
    try {
        const workout = await Workout.update(req.body);
        res.status(202).json(workout);
    } catch (err) {
        res.status(404).json({err})
    }
}

async function destroy (req, res) {
    try {
        await Workout.destroy(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { getAll, findById, findByUserId, create, update, destroy }
