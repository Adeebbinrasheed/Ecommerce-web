const Address = require("../models/Address");

const addAddress = async (req, res) => {
  try {
    const { address, phone } = req.body;

    await Address.create({
      address,
      phone,
      user: req.user._id,
    });
    res.status(201).json({ message: "Address created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user._id });
    res.json({ address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleAddress=async(req,res)=>{
  try {
    const {id}=req.params
    const address=await Address.findById(id)

    res.json({address})
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteAddress=async(req,res)=>{
    try {
        const {id}=req.params
        const address=await Address.findOne({
          _id:id,
          user:req.user._id
        })

        await address.deleteOne()
        res.status(201).json({message:'address deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

module.exports = { addAddress,fetchAllAddress,deleteAddress,singleAddress };
