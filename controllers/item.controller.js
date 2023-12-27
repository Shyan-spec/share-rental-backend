import { Item } from "../models/itemSchema.js";
import { User } from "../models/userSchema.js";
import { Booking } from "../models/bookingSchema.js";

const getItems = async () => {
  const response = await Item.find({});

  return response;
};

const getAnItem = async (id) => {

  try {
    const response = Item.findOne({ _id: id });

    if (response) {
        return response
    } else {
      console.log('Item not found')
    }
  } catch (error) {
   console.log('Internal Server Error')
  }
};

const createAnItem = async(item) => {
    try {
        const newItem = await Item.create(item)
        
        if(newItem && item.owner){
           const userUpdate = await User.findByIdAndUpdate(
                item.owner,
                { $addToSet: { listing: newItem._id } },
                { new: true, useFindAndModify: false }
            );
 
        }

        return newItem

    }catch(error) {
        console.log('Error creating new user' , error)
    }
}

const bookAnItem = async (item) => {
    try {
        const bookedItem = await Booking.create(item)
            
        if (bookedItem && bookedItem.current_user && bookedItem.item) {
           
            const itemUpdate = await Item.findByIdAndUpdate(
                bookedItem.item,
                { curr_booking: bookedItem._id, available: false }, 
                { new: true, useFindAndModify: false }
            );

          
            const userUpdate = await User.findByIdAndUpdate(
                bookedItem.current_user,
                { $addToSet: { curr_renting: bookedItem.item} }, 
                { new: true, useFindAndModify: false }
            );

            console.log(itemUpdate);
            console.log(userUpdate);

            return bookedItem;
        }
     else {
        throw new Error('Booking creation failed');
    }

    }catch(error){
        console.error('Error in booking an item:', error);
        throw error;
    }
}


export {
    getAnItem,
    getItems,
    createAnItem,
    bookAnItem
}