import { Schema, model } from 'mongoose';

const appointmentSchema = Schema({
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    status: {
        type: String,
        enum: ['outstanding', "Resolved", "Canceled"],
        default: 'outstanding'
    },
    comments: {
        type: String
    }
},
    {
    timestamps: true,
    versionKey: false
    }
);

export default model('Appointment', appointmentSchema);