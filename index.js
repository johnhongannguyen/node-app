const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true ,
    useUnifiedTopology: true }, 
() => console.log('Mongoose is connected!!')
);
// Middleware
app.use(express.json());


// Import Routes 

const authRoute = require('./routes/auth');

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.get('/api/test',(req,res)=>{
    res.status(400).json({
        "message":"Welcome to my app"
    })
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
