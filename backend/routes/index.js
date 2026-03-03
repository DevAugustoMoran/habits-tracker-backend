var express = require('express');
var router = express.Router();
const Habit = require('../models/Habit');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', async (req, res) => {
  try{
  const habits = await Habit.find();
  res.json(habits);
  }catch(err){
    res.status(500).json({ message: 'Error retrieving habits' });
  }
});
router.post('/habits', async  (req, res) => {
  try{
  const { title, description } = req.body;
  const habit = new Habit({ title, description });
  await habit.save();
  res.json(habit);
  }catch(err){
    res.status(400).json({ message: 'Error creating Habit'});
  }
});
router.delete('/habits/:id', async (req, res) => {
  try{
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  }catch(err){
    res.status(500).json({ message: 'Habit not found' });
  } 
});
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los hábitos' });
    }
});
module.exports = router;
