import react, { useState } from "react"
import Header from "./components/Header";
import FormArea from "./components/FormArea";
import Note from "./components/Note";
//import Footer from "./components/Footer";
//import gamechess from "./components/gamechess"
///////////////////////

///////////////////


function App (){
    const [notes, setNotes] = useState([])
   
    function addNote(note){
      setNotes(preNotes =>{
          return [...preNotes, note]
      })
    }
    return(
    <div>
        <Header />
        <FormArea addNote={addNote} />
        {/* <Note/>
        <Note/>
        <Note/> */}
    {notes.map(note=>(
      <Note title={note.title} content={note.content}     />
    ))}
        
    
        
    </div>
    );
    }

  export default App;
