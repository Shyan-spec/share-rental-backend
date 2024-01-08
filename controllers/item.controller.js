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
      return response;
    } else {
      console.log("Item not found");
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};

const getItemsByUser = async (id) => {
  const userItems = await Item.find({ owner: id });

  try {
    if (userItems) {
      return userItems;
    } else {
      console.log("Owner has no items");
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};

const createAnItem = async (item) => {
  //For testing purposes NEED TO BE CHANGED IN THE FUTURE
  item.owner = "658892c02f2941b502485764";

  try {
    const newItem = await Item.create(item);

    if (newItem && item.owner) {
      const userUpdate = await User.findByIdAndUpdate(
        item.owner,
        { $addToSet: { listing: newItem._id } },
        { new: true, useFindAndModify: false }
      );
    }

    return newItem;
  } catch (error) {
    console.log("Error creating new user", error);
  }
};

const updateAnItem = async (id, updatedData) => {
  try {
    // Retrieve the existing item
    const itemToUpdate = await Item.findById(id);

    // If there's no existing item, you might want to handle it (e.g., return null or throw an error)

    // Update item details and merge images
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        ...updatedData,
        images: updatedData.images || itemToUpdate.images,
      },
      { new: true, useFindAndModify: false }
    );

    return updatedItem;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be handled by the route
  }
};

const deleteAnItem = async (id) => {
  try {
    const itemToDelete = await Item.findByIdAndDelete({_id: id});
    console.log(itemToDelete)

    if (itemToDelete) {
      return itemToDelete;
    } else {
      console.log("Item not found");
    }
  } catch (error) {
    console.log("Internal Server Error");
  }
};

const bookAnItem = async (item) => {
  try {
    const bookedItem = await Booking.create(item);

    if (bookedItem && bookedItem.current_user && bookedItem.item) {
      const itemUpdate = await Item.findByIdAndUpdate(
        bookedItem.item,
        { curr_booking: bookedItem._id, available: false },
        { new: true, useFindAndModify: false }
      );

      const userUpdate = await User.findByIdAndUpdate(
        bookedItem.current_user,
        { $addToSet: { curr_renting: bookedItem.item } },
        { new: true, useFindAndModify: false }
      );

      return bookedItem;
    } else {
      throw new Error("Booking creation failed");
    }
  } catch (error) {
    console.error("Error in booking an item:", error);
    throw error;
  }
};

export {
  getAnItem,
  getItems,
  createAnItem,
  bookAnItem,
  getItemsByUser,
  updateAnItem,
  deleteAnItem
};
