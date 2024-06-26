
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host="http://localhost:4000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
// get all  notes
const getNotes = async () => {
  //api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MjA4ODY0OGFkMDllMGU5NjIwNzZhIn0sImlhdCI6MTcxNTYwMzYyNX0.pBMwTBSZcD-a9lNOWHRs2ljEy2L--YKvU2t5v5RZYRM"
    },
  });
  const json=await response.json()
  console.log(json)
  setNotes(json)
}
  // add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MjA4ODY0OGFkMDllMGU5NjIwNzZhIn0sImlhdCI6MTcxNTYwMzYyNX0.pBMwTBSZcD-a9lNOWHRs2ljEy2L--YKvU2t5v5RZYRM"
      },
      body: JSON.stringify({title,description,tag})

    });
    const note=await response.json();
    setNotes(notes.concat(note));
  }
  // edit a note
  const editNote = async (id,title,description,tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MjA4ODY0OGFkMDllMGU5NjIwNzZhIn0sImlhdCI6MTcxNTYwMzYyNX0.pBMwTBSZcD-a9lNOWHRs2ljEy2L--YKvU2t5v5RZYRM"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json= await response.json(); 
    console.log(json)
    let newNotes=JSON.parse(JSON.stringify(notes))
   for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
   
   }
   console.log(newNotes);
   setNotes(newNotes);
  };
  // delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MjA4ODY0OGFkMDllMGU5NjIwNzZhIn0sImlhdCI6MTcxNTYwMzYyNX0.pBMwTBSZcD-a9lNOWHRs2ljEy2L--YKvU2t5v5RZYRM"
      },
    });
    const json= response.json(); 
    console.log(json)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
