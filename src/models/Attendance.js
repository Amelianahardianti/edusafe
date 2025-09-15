const mongoose = require('mongoose');
const { Schema } = mongoose;

const presensiSchema = new Schema({
    anak: {
        type: Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['hadir', 'sakit', 'izin'],
        required: true
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    guru: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Presensi = mongoose.model('Presensi', presensiSchema);
module.exports = Presensi;