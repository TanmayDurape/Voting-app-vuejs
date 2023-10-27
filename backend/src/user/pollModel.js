var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({

    question: {
        type: String,
        required: true
    },
    options: [String],
    dueDate: {
        type: Date,
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        required: true,
        caseInsensitive: false,
    }
});

module.exports = mongoose.model('polls', pollSchema);