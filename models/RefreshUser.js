import mongoose from 'mongoose'

const RefreshUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
    }

})

export default mongoose.model('RefreshUser', RefreshUserSchema);