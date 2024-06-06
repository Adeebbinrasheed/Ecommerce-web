const mongoose = require("mongoose");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const schema =new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
},
{
    timestamps:true
});

schema.pre("save", async function () {
    if (!this.isModified("password")) {
      //password modified chythtlenkil
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  }); 
  schema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  schema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
  }

module.exports=new mongoose.model('User1',schema)
