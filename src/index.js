import express from "express";
import userRoutes from './routes/users.routes.js'
import session from './routes/roles.routes.js'
import catego from './routes/categories.routes.js'
import publication from './routes/publication.routes.js'
import comment from './routes/comment.routes.js'
import { PORT } from "./config/config.js";


const app = express();

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    next()
}) 


app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Blogging' })
})

app.use('/blogg/login', session)
app.use('/blogg/users', userRoutes)
app.use('/blogg/publications', publication)
app.use('/blogg/comments', comment)
app.use('/blogg/categories', catego)



app.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}/`)
}) 