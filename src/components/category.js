import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions';
import ProductItem from './product';
import Header from './header';
import {CardGroup, Row, Col } from 'react-bootstrap';

var cards = [
    {
        "image": "1",
        "catID": "Woman",
        "subtitle": "Woman"
    },
    {
        "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
        "catID": "Man",
        "subtitle": "Man"
    }
];

class Category extends React.Component {

    componentWillMount(){
        const catID = this.props.match.params.catId ;
        this.props.getProducts(catID)
    }


    render() {
        if (this.props.productsArr[0]) {
            return this.renderProducts();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty() {
        return (
            <div className='in-center' >
            please try agin !!
            </div>
        )
    }
    renderProducts() {
        const Id = this.props.match.params.catId ;
        const categoryName = cards.map(function (category) {
            if( Id === category.catID)
            return (
                <span className='card-header' key={category.subtitle} >
                    {category.subtitle}
                </span>
            )
        })

        const productsList = this.props.productsArr.map(function (product) {
            return (
                <div key={product.id}>
                    <ProductItem
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        price_unit={'$'}
                        unit={'item'}
                        image={product.imageURLs}
                        category={product.gender}
                    ></ProductItem>
                </div>
            )
        })

        return (
            <div>
                <Header />
                <Row >
                    <Col xs={12} sm={12} >
                        <div style={{ paddingTop: '150px' }} >
                            <h3 className='in-center' style={{ paddingBottom: '20px' }} >
                                {categoryName}
                                </h3>
                            <CardGroup className='container' >
                            {productsList}
                        </CardGroup>
                        </div>
                    </Col>
                </Row>
            </div>
            )
    }
}

const mapStateToProps = state => {
    return { productsArr: state.products.Currentproducts };
};

export default connect(mapStateToProps, { getProducts })(Category);
