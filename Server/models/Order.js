const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    items:[
        {
            quantity:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],

    method:{
        type:String,
        required:true
    },
    paymentInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    paidAt:{
        type:String
    },
    subTotal:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


})

module.exports=new mongoose.model("Order",schema)