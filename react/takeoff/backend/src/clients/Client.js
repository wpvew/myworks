import mongoose from "mongoose";

const Client = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    lastName: {type: String, required: true},
    contacts: {type: Array},
})

export default mongoose.model('Client', Client)
