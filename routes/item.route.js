import { Router } from 'express'

import { createAnItem, getAnItem, getItems, bookAnItem } from '../controllers/item.controller.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const items = await getItems()

        res.json({
            items: items
        })
    }catch(error) {
        console.error(`There was an error`, error); 
        res.status(500).json({ 
            message: "Internal server error"
        });
    }
})

router.get('/:itemId', async function(req, res) {
        const id = req.params.itemId
    try {
        const item = await getAnItem({ _id: id});
        
        res.json({
            item : item
        });
    } catch(error) { 
        console.error(`There was an error`, error);
        res.status(500).json({ 
            message: "Internal server error"
        });
    }
})



router.post('/', async (req,res) => {
    const itemInfo = req.body

    try {
        const newItem = await createAnItem(itemInfo);

        // If newUser is successfully created, send the response back
        if (itemInfo) {
            res.status(200).json({
                newItem
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

router.post('/book', async (req,res) => {

    const itemInfo = req.body

    try {
        const newBookedItem = await bookAnItem(itemInfo);

        // If newUser is successfully created, send the response back
        if (itemInfo) {
            res.status(200).json({
                newBookedItem
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