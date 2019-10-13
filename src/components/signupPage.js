import React from 'react';
import SignupForm from './signupForm';
import { Container } from 'react-bootstrap';
import { IoIosLock } from "react-icons/io";
import loginimage from '../Assets/loginimage.png';

class SignupPage extends React.Component {
    render(){
       return(
           <div style={{ width: '100%',
           height: '1900px' , backgroundImage: `url(${loginimage})` }} >
               <Container style = {{maxWidth : '600px' , paddingTop : '100px' }}>
               <div style={{paddingLeft : '25px' , paddingTop: '100px' , paddingBottom: '25px' , paddingRight: '25px' , background : 'white'}} >
               <div className="modal-header" >
               <h2 style={{color : '#fff' }} >< IoIosLock color="white" size={50} /> Kayıt olmak</h2>
               </div>
              <SignupForm />
              </div>
           </Container>
           </div>
       )
    }
}


export default SignupPage ;