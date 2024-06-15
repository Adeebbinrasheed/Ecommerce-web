const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

module.exports=new mongoose.model('Address',schema)