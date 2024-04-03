import express from "express";
import profile_picture from './routes/picture.routes.js'
import userRoutes from './routes/users.routes.js'
import session from './routes/roles.routes.js'
import catego from './routes/categories.routes.js'
import publication from './routes/publication.routes.js'
import comment from './routes/comment.routes.js'

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Blogging' })
})


app.use('/blogg/login', session)
app.use('/blogg/users', userRoutes)
// app.use('/blogg/profile', profile_picture)
app.use('/blogg/publications', publication)
app.use('/blogg/comments', comment)
app.use('/blogg/categories', catego)

app.listen(3000, ()=>{
    console.log("Server running http://localhost:3000")
}) 