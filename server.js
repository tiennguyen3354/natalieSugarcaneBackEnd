import express from 'express'; 
import chalk from 'chalk' 
import {itemRouter, categoryRouter ,llmRouter, loginRouter} from './routers/router.js'
import cors from 'cors';
const PORT = 8282; 
const app = express(); 
app.use(cors())

// use middle ware 
app.use(express.json());
// Mount the router
app.use("/category", categoryRouter); 
app.use("/item", itemRouter)
app.use("/chat", llmRouter)
app.use('/login', loginRouter)
app.listen(PORT, () => { 
    console.log(`Server is running on port: ${PORT}`)
})