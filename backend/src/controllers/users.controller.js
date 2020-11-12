const { findOneAndDelete } = require("../models/Note");
const Note = require("../models/Note");

const UserCtrl={};
const User =require("../models/User");
UserCtrl.getUsers=async (req,res)=>{
    const Users= await User.find();
    res.json(Users);
}
UserCtrl.createUser=async (req,res)=>{
    const {username}=req.body;
    const newuser=new User({
        name: username
    })
    await newuser.save();
    res.json({message:"User saved"})
};
UserCtrl.getUser=async (req,res)=>{
    const user=await User.findById(req.params.id);
    res.json(user)
}
UserCtrl.deleteUser=async (req,res)=>{
    await User.findOneAndDelete({_id:req.params.id});
    res.json({message: "user  deleted"})
}
UserCtrl.updateUser= async (req,res)=>{
    const {username}=req.body;
    await User.findOneAndUpdate({_id:req.params.id},{
        name:username
    })
    res.json({message:" User updated"})
}
module.exports=UserCtrl;