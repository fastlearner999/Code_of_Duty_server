const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const contentRoutes = require('./routes/content');
const userRoutes = require('./routes/user');
const goalRoutes = require('./routes/goal');
const workoutRoutes = require('./routes/workout');
server.use('/content', contentRoutes);
server.use('/user', userRoutes);
server.use('/goal', goalRoutes);
server.use('/workout', workoutRoutes);

server.get('/', (req, res) => res.send('Welcome to the Energize App'));

module.exports = server