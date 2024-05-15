
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const notesInitial= [
        {
          "_id": "66427a065b8173bfb336f87d",
          "user": "6642088648ad09e0e962076a",
          "title": "Second note updated",
          "description": "this is the updated second note",
          "tag": "Personal",
          "date": "2024-05-13T20:37:26.392Z",
          "__v": 0
        },
        {
          "_id": "6642899f4e24f65a9f4dab14",
          "user": "6642088648ad09e0e962076a",
          "title": "Third note",
          "description": "this is the third test note",
          "tag": "Personal",
          "date": "2024-05-13T21:43:59.335Z",
          "__v": 0
        },
        {
          "_id": "664289d84e24f65a9f4dab18",
          "user": "6642088648ad09e0e962076a",
          "title": "First note",
          "description": "this is the first test note",
          "tag": "Personal",
          "date": "2024-05-13T21:44:56.039Z",
          "__v": 0
        },
        {
          "_id": "664289d84e24f65a9f4dab18",
          "user": "6642088648ad09e0e962076a",
          "title": "First note",
          "description": "this is the first test note",
          "tag": "Personal",
          "date": "2024-05-13T21:44:56.039Z",
          "__v": 0
        },
        {
          "_id": "664289d84e24f65a9f4dab18",
          "user": "6642088648ad09e0e962076a",
          "title": "First note",
          "description": "this is the first test note",
          "tag": "Personal",
          "date": "2024-05-13T21:44:56.039Z",
          "__v": 0
        },
      ]
      const [notes, setNotes] = useState(notesInitial)
 
 return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
 )
}

export default NoteState;