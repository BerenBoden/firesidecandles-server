import mongoose from 'mongoose'

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected')
    }catch(err){
        console.log(err);
    }
}

export default connectDB;