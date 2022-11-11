const mongoose = require("mongoose")

const PinSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true
    },

    title : {
        type : String,
        require : true,
        min : 3
    },

    rating : {
        type : Number,
        require : true,
        min : 0,
        max : 5
    },

    lat : {
        type : Number,
        require : true,
    },

    lon : {
        type : Number,
        require : true
    },

    descr : {
        type:String,
        require:true
    }
},{timestamps : true})

module.exports = mongoose.model("Pin", PinSchema)