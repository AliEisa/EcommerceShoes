import React from 'react';
import { connect } from 'react-redux';
import { addToCart, updateCart } from '../actions';
import { Button , Modal } from 'react-bootstrap';
//import { IoIosAddCircleOutline , IoMdRemoveCircleOutline } from "react-icons/io";
import SweetAlert from 'react-bootstrap-sweetalert';
import Header from './header';
import {CardGroup, Row, Col } from 'react-bootstrap';

class Item extends React.Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      alert: null,
      qty: 1,
      lgShow: false,
      id:1
    };
  }


  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }


  handleCart() {


    const product = [...this.props.cart, {
      product_id: this.props.id,
      product_name: this.props.name,
      price: this.props.price,
      price_unit: this.props.price_unit,
      unit: this.props.unit,
      image: this.props.image,
      category: this.props.category,
      quantity: this.state.qty
    }]

    let _id = this.props.id

    let cartIndex = this.props.cart.findIndex(function (cart) {
      return cart.product_id === _id
    })
    if (cartIndex === -1) {
      this.props.addToCart(product)
    } else {
      this.props.updateCart(_id, 1)
    }

    const getAlert = () => (
        <SweetAlert
          success
          title="Done!!"
          onConfirm={() => this.hideAlert()}
        >

        </SweetAlert>
      );

      this.setState({
        alert: getAlert()
      });
     this.setState({lgShow: true,id:this.props.id,});

  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  onIncrement(e) {
    e.preventDefault();
    this.setState({
      qty : this.state.qty + 1
    });
  }
  onDecrement(e) {
    e.preventDefault();
    if (this.state.qty > 1) {
      this.setState({
        qty : this.state.qty - 1
      });
    }
  }

  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let price_unit = this.props.price_unit;
    let unit = this.props.unit;


    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={name}
          />
        </div>
        <h4 className="product-name">{name}</h4>
        <p className="product-price" >{unit} <span style={{ color: 'green' }} >{price} {price_unit}</span> </p>
        <div className="stepper-input">
          <a href="#" className="decrement" onClick={this.onDecrement.bind(this)} >
            –
        </a>
          <input
            value={this.state.qty}
            onChange={this.onChange.bind(this)}
            type="text"
            name="qty"
            className="quantity"
          />
          <a href="#" className="increment" onClick={this.onIncrement.bind(this)} >
            +
        </a>
        </div>
        <div className="product-action">
          <Button onClick={this.handleCart.bind(this)} variant="outline-info" >Add To Cart</Button>
        </div>
        {this.state.alert}

      </div>
    )
  }

}

const mapStateToProps = state => {
  return { cart: state.cart.cart };
};

export default connect(mapStateToProps, { addToCart, updateCart })(Item);
