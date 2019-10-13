import React from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteCartItem , createOrder , cleanCart} from '../actions';
import { ButtonGroup, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from './header';
import SweetAlert from 'react-bootstrap-sweetalert';

import img from '../Assets/empty-cart-img.png';

class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteAlert: null,
            showDetails: null
        };
    }

    hideAlert(cart , totalAmount , phone , product_count) {
        this.props.createOrder(cart , totalAmount, phone , product_count);
        this.props.cleanCart();

        this.setState({
            showDetails: null
        });
    }



    handleOrder( cart , totalAmount , phone , product_count ){
        const getAlert = () => (
            <SweetAlert success title="Success" onConfirm={this.hideAlert.bind(this,cart,totalAmount,phone,product_count)}>
            </SweetAlert>
        );

        this.setState({
            showDetails: getAlert()
        });

    }

    onCancelDelete() {
        console.log('Hiding alert...');
        this.setState({
            deleteAlert: null
        });
    }

    deleteFile(_id){

        const currentProductToDelete = this.props.cart;
        const indexToDelete = currentProductToDelete.findIndex(
            function (cart) {
                return cart.product_id === _id;
            }
        )
        let cartAfterDelete = [...currentProductToDelete.slice(0, indexToDelete),
        ...currentProductToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
        
        this.setState({
            deleteAlert: null
        });
    }

    onDelete(_id) {

        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={this.deleteFile.bind(this,_id)}
                onCancel={this.onCancelDelete.bind(this)}
            >
             Delete this item form cart
             </SweetAlert>
        );

        this.setState({
            deleteAlert: getAlert()
        });

    }


    onIncrement(_id) {
        this.props.updateCart(_id, 1)
    }
    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1)
        }
    }


    render() {
        if(this.props.isLogin){
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    else
    {
        return <Redirect to="/login" />
    }
    }
    renderEmpty() {
        return (
            <div style={{width: '100%',
            height: '880px',
            background: 'white'  }} >
            <div>
                <Header/>
                <div className="empty-cart">
                <img
                    src={img}
                    alt="empty-cart"
                />
                <h2>Cart empty!</h2>
            </div>
            </div>
            </div>
        )
    }
    renderCart() {
        const cartItemsList = this.props.cart.map(function (cartArr) {
            return (
                <Row className="cart-item" key={cartArr.product_id} >
                    <Col xs={12} sm={4} >
                        <img className="product-image" src={cartArr.image} alt="empty-cart" />
                        <div className="product-info">
                            <p className="product-name">{cartArr.product_name}</p>
                            <p className="product-price">{cartArr.price}</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={2} >
                        <h6>qty. <Badge variant="success">{cartArr.quantity}</Badge></h6>
                    </Col>
                    <Col xs={12} sm={2} >
                        <h6>Total price: {cartArr.quantity * cartArr.price} <span style={{ color : 'green'}} >$</span> </h6>
                    </Col>
                    <Col>
                        <ButtonGroup style={{ minWidth: '300px' }}>
                            <Button onClick={this.onDecrement.bind(this, cartArr.product_id, cartArr.quantity)} variant="light" size='sm'>-</Button>
                            <Button onClick={this.onIncrement.bind(this, cartArr.product_id)} variant="light" size='sm'>+</Button>
                            <Button onClick={this.onDelete.bind(this, cartArr.product_id)} variant="danger" >Delete</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            )
        }, this)
        return (
            <div>
                <Header/>
                <Container>
                    {cartItemsList}
                    <Col xs={12} >
                        <h6>Price: {this.props.totalAmount} <span style={{ color : 'green'}} >$</span> </h6>
                        <Button onClick={this.handleOrder.bind(this,this.props.cart,this.props.totalAmount,this.props.phone,this.props.cart.length)} variant="success">Buy</Button>
                    </Col>
                </Container>
                {this.state.deleteAlert}
                {this.state.showDetails}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
        orders: state.orders.orders,
        phone:state.auth.userPhone,
        isLogin: state.auth.isLogin
    }
}
export default connect(mapStateToProps, { updateCart, deleteCartItem , createOrder, cleanCart})(Cart);
