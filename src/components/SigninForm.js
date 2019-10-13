import React from 'react';
import { connect } from 'react-redux';
import { userSignin } from '../actions';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SigninForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            phone_number: '',
            password: ''
        };
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.password && this.state.phone_number)
        this.props.userSignin({ phone_number: this.state.phone_number, password: this.state.password });
        else{
            toast.error("Try again please!", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
    }
     renderLoginState = () =>{
        console.log(this.props.message);
        if(true){
            toast.error("Try again please!", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
    };

    renderLogin() {
        return (
            <div>
          <ToastContainer/>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div className="form-group">
                        <input
                            placeholder= "user id"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="phone_number"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        placeholder= "password"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <div className="in-center">
                        <button className="btn btn-primary btn-lg" >
                        submit
                         </button>
                    </div>

                </form>
            </div>
        )
    }
    renderHomePage() {
        return (
            <Redirect to="/homepage" />
        )
    }

    render() {
        if (this.props.isLogin) {
            return this.renderHomePage()
        }
        else {
            return this.renderLogin()
        }
    }
}

function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin,
        message: state.auth.message,
        phone: state.auth.userPhone
    }
}
export default connect(mapStateToProps, { userSignin })(SigninForm);
