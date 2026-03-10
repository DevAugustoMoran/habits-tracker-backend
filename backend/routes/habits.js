const express = require('express');
const router = express.Router();

const Habit = require('../models/Habit'); 

router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find(); 
        res.status(200).json(habits); 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los hábitos' });
    }
});

module.exports = router;