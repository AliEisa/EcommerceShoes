import React from 'react';
import { connect } from 'react-redux';
import { userSignup } from '../actions';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            phone_number: '',
            password: '',
            user_name: '',
            title: '',
            address: '',
            email: ''
        };
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.phone_number && this.state.password && this.state.user_name 
            && this.state.title && this.state.address && this.state.email)
        this.props.userSignup({ phone_number: this.state.phone_number,
            password: this.state.password,
            user_name: this.state.user_name,
            title: this.state.title,
            address: this.state.address,
            email: this.state.email
        });
        else{
            toast.error("tüm alanlar zorunludur !", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
    }

    renderRegister() {
        return (
            <div >
                <ToastContainer/>
                 <form onSubmit={this.onSubmit.bind(this)} >
                    <div className="form-group">
                        <input
                        placeholder ="Kullanıcı adı"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="user_name"
                            className="form-control"
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                            placeholder ="Telefon numarası"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="phone_number"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder = "E-posta"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="email"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        placeholder = "Başlık"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="title"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder = "Adres"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="text"
                            name="address"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder = "Parola"
                            value={this.state.val}
                            onChange={this.onChange.bind(this)}
                            type="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <div className="in-center">
                        <button className="btn btn-primary btn-lg">
                        kaydol
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
        if (this.props.isRegister) {
            return this.renderHomePage()
        }
        else {
            return this.renderRegister()
        }
    }
}

function mapStateToProps(state) {
    return {
        isRegister: state.auth.isRegister,
        message: state.auth.registerMessage,
        phone: state.auth.userPhone
    }
}
export default connect(mapStateToProps, { userSignup })(SignupForm);