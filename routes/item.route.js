import { Router } from 'express'
import multer from 'multer'

import { createAnItem, getAnItem, getItems, bookAnItem, getItemsByUser,updateAnItem, deleteAnItem } from '../controllers/item.controller.js'

const router = Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploaded-images/'); // Save files in 'uploads' folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });


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

router.put('/:itemId', async (req, res) => {
    const id = req.params.itemId;
    const updatedData = req.body;

    try {
        const updatedItem = await updateAnItem(id, updatedData);
        res.json({ item: updatedItem });
    } catch (error) {
        console.error(`There was an error`, error);
        res.status(500).json({ 
            message: "Internal server error"
        });
    }
});

router.delete('/:itemId', async (req, res) => {
    const id = req.params.itemId

    try {
        const deletedItem = await deleteAnItem(id);
    
        if (deletedItem) {
          res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
      }
})

router.get('/user/:userId', async function(req, res) {
    const id = req.params.userId
try {
    const items = await getItemsByUser({ _id: id});
    
    res.json({
        items : items
    });
} catch(error) { 
    console.error(`There was an error`, error);
    res.status(500).json({ 
        message: "Internal server error"
    });
}
})



router.post('/', upload.array('images'), async (req,res) => {
    const itemInfo = req.body

    if (req.files) {
        itemInfo.images = req.files.map(file => file.path);
        console.log(req.files)
    }

    try {
        const newItem = await createAnItem(itemInfo);
        console.log(newItem.images[0])
            console.log(newItem)
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
        console.log("submitted")
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