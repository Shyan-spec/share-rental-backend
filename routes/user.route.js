import { Router } from 'express'

import { getUsers, createUser } from '../controllers/user.controller.js'

const router = Router()


router.get('/', async function(req, res) {

    try {
        const users = await getUsers();
        
        res.json({
            users: users
        });
    } catch(error) { 
        console.error(`There was an error`, error); // Correct use of console.log
        res.status(500).json({ // 500 is more appropriate for server-side errors
            message: "Internal server error"
        });
    }
})

router.post('/', async (req,res) => {
    const userInfo = req.body

    try {
        const newUser = await createUser(userInfo);

        // If newUser is successfully created, send the response back
        if (newUser) {
            res.status(200).json({
                newUser
            });
        } else {
            // If newUser was not created, send a 400 Bad Request
            res.status(400).json({
                message: "Error creating new user"
            });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default router


