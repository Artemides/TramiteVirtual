const NotesCtrl={};
const { findByIdAndDelete } = require("../models/Note");
const Note=require("../models/Note")
NotesCtrl.getNotes = async (req,res)=>{
    const notes = await Note.find();
    res.json(notes)

}
NotesCtrl.createNote= async (req,res)=>{
    const {title,content,date,author}=req.body;
    const newNote= new Note({
        title: title,
        content: content,
        date: date,
        author: author
    })
    await newNote.save();
    res.json({message:"Note saved"})
}
NotesCtrl.getNote=async (req,res)=>{
    const note=await Note.findById(req.params.id);
    res.json(note);
}
NotesCtrl.updateNote=async(req,res)=>{
    const {title,content,author}=req.body;
    await Note.findOneAndUpdate({_id:req.params.id},{
        title,content,author
    })
    res.json({message: "Actualizado"})
}
NotesCtrl.deleteNote=async (req,res)=>{
    await Note.findOneAndDelete({_id:req.params.id});
    res.json({messaje: "Note deleted"})
} 

module.exports=NotesCtrl;
