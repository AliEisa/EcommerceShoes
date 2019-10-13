import React from 'react';
import SigninForm from './SigninForm';
import { Container } from 'react-bootstrap';
import { IoIosUnlock } from "react-icons/io";
import loginimage from '../Assets/loginimage.png';


class SigninPage extends React.Component {
    render(){
       return(
        <div style={{width: '100%',
        height: '1080px' , backgroundSize: '100% 100%' , backgroundColor: '#032B42'  }} >
           <Container style = {{maxWidth : '600px' , paddingTop : '100px' }}  >
           <div style={{paddingLeft : '25px' , paddingTop: '100px' , paddingBottom: '25px' , paddingRight: '25px' , background : 'white'}} >
              <div className="modal-header" >
              <h5 style={{color : '#fff' }} > < IoIosUnlock color="white" size={50} /> Login </h5>
              </div>
              <SigninForm />
           </div>
           </Container>
           </div>
       )
    }
}


export default SigninPage ;
