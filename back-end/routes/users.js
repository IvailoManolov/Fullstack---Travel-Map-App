const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')

//Register.
router.post("/register", async(req,res) => {
    try {
        //generate new password.
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        //create new user.
        const newUser = new User({
            userName : req.body.userName,
            email : req.body.email,
            password : hashedPassword
        })

        //save user and send responce.
        const user = await newUser.save()
        console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Registering user")
        res.status(200).json(user._id)

    }catch(err){
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]Registering user")
        res.status(500).json(err)
    }
})

//Login.
router.post("/login",async (req,res) => {
    try
    {
        //find the user.
        const user = await User.findOne({userName : req.body.userName})

        if(!user)
        {
            console.log('\x1b[41m%s\x1b[0m',"[FAILED]Loging in with user (Wrong username)")
            res.status(400).json("Wrong username or password!")
        }

        else
        {

            //validate password.
            const validPassword = await bcrypt.compare(req.body.password,user.password)

            if(!validPassword)
            {
                console.log('\x1b[41m%s\x1b[0m',"[FAILED]Loging in with user (Wrong pass)")
                res.status(400).json("Wrong username or password!")
            }

            else
            {
                //send res
                console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Loging in with user")
                res.status(200).json(user)
            }
        }
    }
    catch(err)
    {
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]Loging in with user")
        res.status(500).json(err)
    }
})

module.exports = router