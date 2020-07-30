const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb+srv://hongan_93:An0946313183@cluster0.ums61.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true ,
    useUnifiedTopology: true }, 
() => console.log('Mongoose is connected!!')
);

// Import Routes 

const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);



app.listen(3000, () => console.log(`Server is listening`))
