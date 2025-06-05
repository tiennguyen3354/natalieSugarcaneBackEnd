import express from 'express'; 
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { getCategories, addCategory, updateCategory, deleteCategory } from './../controllers/categoryController.js'
import { getItems, addItem, updateItem, deleteItem, getItemsBasedOnCategory } from './../controllers/itemController.js'
import { getChatResponse } from '../controllers/llmController.js';
import { getLogin } from '../controllers/loginController.js';



// login router
const loginRouter = express.Router();
loginRouter.post('/', getLogin); 

// category router 
const categoryRouter = express.Router();
categoryRouter.get('/', getCategories); 
categoryRouter.post('/', upload.single("image"),  addCategory); 
categoryRouter.put('/:id', upload.single("image"), updateCategory); 
categoryRouter.delete('/:id', deleteCategory);

// item router 
const itemRouter = express.Router(); 
itemRouter.get('/', getItems); 
itemRouter.get('/categories/:category_name', getItemsBasedOnCategory)
itemRouter.post('/', addItem); 
itemRouter.put('/:id', updateItem); 
itemRouter.delete('/:id', deleteItem); 

//llm router 
const llmRouter = express.Router(); 
llmRouter.post('/llm', getChatResponse);

export {itemRouter, categoryRouter, llmRouter, loginRouter}