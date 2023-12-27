import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // Regex for email validation
  },
  phone: {
    type: String,
    match: [/^\d{3}-\d{3}-\d{4}$/, "Please fill a valid phone number"], // Regex for a simple 10-digit phone number validation
  },
  username: { type: String, required: true },
  profile_image: { type: Buffer },
  location: { type: String },
  curr_renting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", // Reference to the Currently Renting Schema
    },
  ],
  listing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the users listings Schema 
    },
  ],
});

const User = mongoose.model('User', UserSchema)

export { 
    User
}
