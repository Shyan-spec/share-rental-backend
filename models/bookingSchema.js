import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },
      current_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      dateOfPurchase: {
        type: Date,
        default: Date.now,
        required: true
      },
      dateOfReturn: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
})

const Booking = mongoose.model('Booking', BookingSchema)

export {
    Booking
}
