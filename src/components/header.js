import React from 'react';
import { Nav, Navbar, NavDropdown, Badge, Modal, Button } from 'react-bootstrap';
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout  } from '../actions';
import SweetAlert from 'react-bootstrap-sweetalert';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            logoutAlert: null
        };
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onConfirm() {
        this.props.logout();
        this.setState({
            logoutAlert: null
        });
    }

    onCancel() {
        this.setState({
            logoutAlert: null
        });
    }

    handleLogOut(e) {
        e.preventDefault();
        const getAlert = () => (
            <SweetAlert
                custom
                showCancel
                confirmBtnText="YES"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="default"
                customIcon="thumbs-up.jpg"
                title="Do you really want to leave ?"
                onConfirm={this.onConfirm.bind(this)}
                onCancel={this.onCancel.bind(this)}
            >
            </SweetAlert>
        );

        this.setState({
            logoutAlert: getAlert()
        });

    }

    render() {
        const title = <span><MdPerson size={32} /> {this.props.name} </span>
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: '#17a2b8' }} >
                    <Navbar.Brand href="/">Shoe Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Link to="/cart" className='nav-link' >
                                < FaCartArrowDown color="white" size={32} />
                                <span>  </span><Badge variant="success">{this.props.cart.length}</Badge>
                            </Link>
                        </Nav>
                        <NavDropdown title={title} id="nav-dropdown"  >
                            <NavDropdown.Item href="#action/3.4" onClick={this.handleLogOut.bind(this)} > < IoIosLogOut color="black" size={32} /> Sign out </NavDropdown.Item>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Navbar>

                {this.state.logoutAlert}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        name: state.auth.user_name,
        amount: state.orders.total_amount,
        payment: state.orders.total_payment,
        invoice: state.orders.total_invoice,
        phone: state.auth.userPhone
    }
}

export default connect(mapStateToProps, { logout })(Header)
