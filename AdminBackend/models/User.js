import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  PhoneNumber: { type: String, required: true },
  Active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});


const User = mongoose.model('User', UserSchema);
export default User;

