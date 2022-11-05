import mongoose from 'mongoose';

const Contact = new mongoose.Schema(
  {
    field: String,
    value: String,
    type: { type: String },
  }
);

const Client = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    lastName: {type: String, required: false},
    createdAt: {type: String, required: true},
    updatedAt: {type: String, required: true},
    contacts: [Contact]
});

export default mongoose.model('Client', Client);
