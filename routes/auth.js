const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const {registerValidation,loginValidation} = require('../validation')


router.post('/register', async (req,res)=>{

    // validate the data before making a user 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // checking the exist user in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // hash passwords 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

// Login 

router.post('/login', async (req,res)=>{
    // validate the data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // checking the exist email in database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is not found');
    // if password is correct 
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass)
    return res.status(400).send('Invalid Password');

    // create and assign a token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged in successful')
}); 




module.exports = router;