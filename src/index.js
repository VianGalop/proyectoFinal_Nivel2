import express from "express";
import userRoutes from './routes/users.routes.js'
import session from './routes/roles.routes.js'

const app = express();


app.use(express.json())

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})


app.use('/blogg/user', session)
app.use('/blogg/user', userRoutes)


app.listen(3000, ()=> console.log("Server running http://localhost:3000"))