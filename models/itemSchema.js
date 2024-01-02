import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    price: {type: Number, required: true},
    images: [{ 
        type: String
    }],
    quality: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quality"
    }],
    curr_booking : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    available: {type: Boolean, default: true}
})

const Item = mongoose.model("Item", itemSchema)

export {
    Item
}