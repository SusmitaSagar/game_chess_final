import React from 'react' ;//rfce ,es6 extension
import Paper from '@material-ui/core/Paper';
import chesslogo from './chesslogo.jpg';
import pre from '@babel/template'

function Header() {
    return (
        <>
        <Paper style={{display:'flex'}} elevation={18}>
            <img style={{width:"250px"}} src={chesslogo } alt="chesslogo" />
             <pre><h1>{`
         SHATRANJ
         The chess app
             `}</h1></pre>
              
        </Paper>
        </>
    );
}

export default Header;
