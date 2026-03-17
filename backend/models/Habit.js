const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completedDays: {
        type: Number,
        default: 0
    },
    lastCompletedDate: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Habit', habitSchema);