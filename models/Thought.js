const { Schema, model,  } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: current.timestamp,

    }
})