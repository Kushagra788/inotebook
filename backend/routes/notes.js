const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route1: get all notes of a logged in user GET: "api/notes/fetchallnotes". lOGIN REQUIRED
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");  
  }
});

//Route 2: Add a new note using POST: "api/notes/addnote". lOGIN REQUIRED
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description","description must be atleast five characters long.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
    const {title,description,tag}=req.body;
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
    title,description,tag,user:req.user.id
    })
    const savedNote=await note.save()
    res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");   
    }
}

);
//Route 3: update an existing note using PUT: "api/notes/updatenote". lOGIN REQUIRED
router.put('/updatenote/:id',fetchuser,async (req, res) => {
  const{title,description,tag}=req.body;
  //create a newNote object
  const newNote={};
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};
// find if note which is to be updated exists or not
let note=await Note.findById(req.params.id);
if(!note){return res.status(404).send("note not found")}

//check jo user ka note hai vahi usko update kar ra hai ya nahi
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
}
//update note
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});

  })
  //Route 4: delete an existing note using DELETE: "api/notes/deletenote". lOGIN REQUIRED
router.delete('/deletenote/:id',fetchuser,async (req, res) => {
  // find if note which is to be deleted exists or not
  let note=await Note.findById(req.params.id);
  if(!note){return res.status(404).send("note not found")}
  
  //check jo user ka note hai vahi usko delete kar ra hai ya nahi
  if(note.user.toString()!==req.user.id){
      return res.status(401).send("acess denied");
  }
  note=await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"note has been deleted" , note:note});
    })
module.exports = router;
