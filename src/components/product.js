import React from 'react';
import { connect } from 'react-redux';
import { addToCart, updateCart, getRec } from '../actions';
import { Button , Modal } from 'react-bootstrap';
//import { IoIosAddCircleOutline , IoMdRemoveCircleOutline } from "react-icons/io";
import SweetAlert from 'react-bootstrap-sweetalert';
import Header from './header';
import {CardGroup, Row, Col } from 'react-bootstrap';
import Item from './item';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class ProductItem extends React.Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      alert: null,
      qty: 1,
      lgShow: false,
      id:1,
      rating:0
    };
  }


  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }


  handleCart() {
  this.props.getRec(this.props.id);

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


     this.setState({lgShow: true,id:this.props.id,});

  }
  handleRate () {

    const { user_id , id } = this.props ;

    const url = 'http://localhost/api/addRating.php?user_id='+user_id+'&item_id='+id+'&rate='+this.state.rating;
    console.log(user_id);
    console.log(id);

axios.get(url).then( res => {
  const { data } = res ;
  if (data.success === 1){

  }
}).catch(function (error) {
      console.log(error);
  });

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
  changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }


  render() {
    let lgClose = () => this.setState({ lgShow: false });
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let price_unit = this.props.price_unit;
    let unit = this.props.unit;

    const Id = this.state.id ;
    console.log(this.props.productsRec);
    const productsList = this.props.productsRec.map(function (product) {
        return (
            <div key={product.id}>
                <Item
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    price_unit={'$'}
                    unit={'item'}
                    image={product.imageURLs}
                    category={product.gender}
                ></Item>
            </div>
        )
    })

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
        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={lgClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton  className='modalContiainer' >
            <Modal.Title id="example-modal-sizes-title-lg">
              Item added successfully
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='container'>
          <div  className='rate'>
          <StarRatings
        rating={this.state.rating}
        starRatedColor="blue"
        changeRating={ (num) => this.changeRating(num,'rating')}
        numberOfStars={5}
        name='rating' />
        <Button onClick={this.handleRate.bind(this)} variant="outline-info" className='btn' >Rate it </Button>
        </div>
              <Row >
                  <Col xs={12} sm={12} >
                      <div style={{ paddingTop: '150px' }} >
                          <h3  >
                              People whos bought this item also bought :
                              </h3>
                          <CardGroup className='container' >
                          {productsList}
                      </CardGroup>
                      </div>
                  </Col>
              </Row>
          </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { cart: state.cart.cart ,  productsRec: state.products.productsRec  , user_id : state.auth.id };
};

export default connect(mapStateToProps, { addToCart, updateCart , getRec })(ProductItem);
