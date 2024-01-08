import { Router } from 'express'

import {  getItems } from '../controllers/item.controller.js'

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

export default router 