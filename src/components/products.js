import React from 'react';
import { connect } from 'react-redux';
import { addProduct, deleteProduct } from '../actions';
import { CardGroup, Row, Col, Carousel } from 'react-bootstrap';
import ProductItem from './product';
import CategoryCard from './categoryCaed';

import img3 from '../Assets/3.jpg';
import img5 from '../Assets/5.jpg';
import img6 from '../Assets/6.jpg';
import img7 from '../Assets/7.jpg';
import img8 from '../Assets/8.jpg';
//import Cart from './cart';

var cards = [
    {
        "image": "1",
        "catID": "Woman",
        "subtitle": "Women"
    },
    {
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
        "catID": "Man",
        "subtitle": "Men"
    }
];

class Products extends React.Component {

    render() {

        const categoryList = cards.map(function (product) {
            return (
                <div key={product.catID}>
                    <CategoryCard
                        photo = {product.image}
                        category={product.subtitle}
                        catID = {product.catID}
                    ></CategoryCard>
                </div>
            )
        })
        return (
            <div>
                <Row>
                    <Col xs={0} sm={12} >
                        <Carousel interval="2000" >
                            <Carousel.Item>
                                <img style={{ width: '100%', height: '500px' }}
                                    className="d-block w-100"
                                    src={img3}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{ width: '100%', height: '500px' }}
                                    className="d-block w-100"
                                    src={img5}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{ width: '100%', height: '500px' }}
                                    className="d-block w-100"
                                    src={img6}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{ width: '100%', height: '500px' }}
                                    className="d-block w-100"
                                    src={img7}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{ width: '100%', height: '500px' }}
                                    className="d-block w-100"
                                    src={img8}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
                <Row >
                    <Col xs={12} sm={12} >
                        <div style={{ paddingTop: '150px' , paddingBottom: '150px' }} >
                            <h3 className='in-center' style={{ paddingBottom: '20px' }} ><span className='card-header' >Category</span></h3>
                            <CardGroup className='container' >
                            {categoryList}
                        </CardGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={9} >
                        <CardGroup className='container' >

                        </CardGroup>
                    </Col>
                </Row>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { productsArr: state.products.Currentproducts };
};

export default connect(mapStateToProps, { addProduct, deleteProduct })(Products);
