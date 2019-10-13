import React from 'react';
import { connect } from 'react-redux';
import { Badge, Container, Table } from 'react-bootstrap';
import Header from './header';
import { Redirect } from 'react-router-dom';

class Orders extends React.Component {



    render() {
        console.log(this.props.order_details)
        if(this.props.isLogin){
        if (this.props.order_details[0]) {
            return this.renderOrders();
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
            <div>
                <Header />
                <div className="empty-cart">
                    <h2>Bir şeyler yanlış gitti. Lütfen tekrar deneyin</h2>
                </div>
            </div>
        )
    }
    renderOrders() {

        const detailsList = this.props.order_details[0].map( (orderDet , index) => {
            return (
                <tr key={orderDet.order_detail_id}>
                    <th>{ index + 1 }</th>
                    <td>{orderDet.product_name}</td>
                    <th><span style={{ color : 'green'}} > {orderDet.price} </span> TL </th>
                    <td><Badge variant="success">{orderDet.quantity}</Badge></td>
                    <td>{orderDet.price * orderDet.quantity}</td>
                </tr>
            )
        })

        return (
            <div >
                <Header />
                <Container>
                    <Table striped bordered hover style={{ marginTop: '30px' }} >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>product</th>
                                <th>price </th>
                                <th>quantity</th>
                                <th>total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        order_details: state.orders.order_details,
        isLogin: state.auth.isLogin
    }
}
export default connect(mapStateToProps)(Orders);
