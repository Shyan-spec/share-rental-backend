import { User } from "../models/userSchema.js";

const getUsers = () => {
    const response = User.find({}).then((response) => {
        return response
    })

    return response
}

const createUser = (user) => {
    try {
        const newUser = User.insertMany(user)
        return newUser

    }catch(error) {
        console.log('Error creating new user' , error)
    }
}

export {
    getUsers,
    createUser
}