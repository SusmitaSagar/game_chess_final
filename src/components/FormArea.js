import React, { useState } from "react";
import {  Fab, Paper, TextField } from "@material-ui/core";

function FormArea({addNote}) {
    const [note, setNote] = useState({
        title :"",
        content:"",
    }); //takes argument and return
    function clickHandler(){
      addNote(note); // after clicking on play title and note are empty after submitting 
      setNote({
        title:"",
       content:"",
      
      })
     }
       function changeHandler(event){
       const {name, value} = event.target
      setNote(preValues =>{
       return{
       ...preValues,   // hook to acess previous prop , here value
       [name]: value,
     }
  })
}
  
  return (
    <Paper style={{ margin: "20px 10%", padding: "8px" }}>
      <form>
        <TextField 
         onChange={changeHandler}
         name="title"
         value={note.title} 
          label="Player no. and Colour"
          
            />
          <br></br>
         <TextField
         onChange={changeHandler}
         name="content" 
         value={note.content}
          label=" Player Nam"
          multiline
          rows={2}
          
        />
        <Fab onClick={clickHandler} style={{marginTop:"60px", left: "70px" }}>play</Fab>
      </form>
    </Paper>
  );
}

export default FormArea;
