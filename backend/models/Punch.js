const mongoose = require('mongoose');

const punchSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    clockIn: {
        time: Date,
        location: {
            lat: Number,
            long: Number
        }
    },
    clockOut: {
        time: Date,
        location: {
            lat: Number,
            long: Number
        }
    }
});

module.exports = mongoose.model('Punch', punchSchema);