import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
});

export default mongoose.model('User', User);
