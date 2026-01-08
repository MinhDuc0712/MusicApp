import mongoose from 'mongoose';

const deviceSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deviceId: {type: String, required: true},
    deviceModel: {type: String},
    refreshToken: {type: String, required: true},
    lastLogin: {type: Date, default: Date.now},
});

deviceSessionSchema.index({user: 1}, {unique: true});

export default mongoose.model('DeviceSession', deviceSessionSchema);