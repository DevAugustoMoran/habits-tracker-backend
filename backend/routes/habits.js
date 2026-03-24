const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth'); 

router.use(auth);

router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los hábitos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newHabit = new Habit({
            name: req.body.name,
            userId: req.user._id 
        });
        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el hábito' });
    }
});

router.put('/:id/complete', async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, userId: req.user._id });
        if (!habit) return res.status(404).json({ error: 'Hábito no encontrado' });

        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        let lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate) : null;
        if (lastCompleted) lastCompleted.setHours(0, 0, 0, 0);

        let diffDays = null;
        if (lastCompleted !== null) {
            const diffTime = Math.abs(today - lastCompleted);
            diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        }

        if (diffDays === 0) {
            return res.status(200).json(habit);
        }

        if (diffDays === 1 || !lastCompleted) {
            habit.completedDays += 1;
        } else {
            habit.completedDays = 1;
        }

        habit.lastCompletedDate = today;
        const updatedHabit = await habit.save();

        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el hábito' });
    }
});

module.exports = router;