const router = require("express").Router()

const Pin = require("../models/Pin")

//Create a pin.
router.post("/",async (req,res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)
        console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Creating a new pin")
    }
    catch(err){
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]Creating a new pin")
        res.status(500).json(err)
    }
})

//Get all pins.
router.get("/",async(req,res) => {
    try {
        const pins = await Pin.find()
        console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]Getting pins")
        res.status(200).json(pins)
    }catch(err) {
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]Getting pins")
        res.status(500).json(err)
    }
})

module.exports = router