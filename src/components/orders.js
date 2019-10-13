import React from 'react';
import { connect } from 'react-redux';
import { getOrders, getOrderdetails } from '../actions';
import { Button, Badge, Container, Table } from 'react-bootstrap';
import Header from './header';
import img from '../Assets/empty-cart.jpg';
import { Link , Redirect } from 'react-router-dom';

class Orders extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            orderStatus : [
                {
                    id: "1",
                    name: "Beklemede",
                    badgStyle : "warning"
                },
                {
                    id: "2",
                    name: "Hazırlanıyor",
                    badgStyle : "info"
                },
                {
                    id: "3",
                    name: "Hazır",
                    badgStyle : "info"
                },
                {
                    id: "4",
                    name: "Yolda",
                    badgStyle : "Primary"
                }, {
                    id: "5",
                    name: "Teslim Edildi",
                    badgStyle : "success"
                }, {
                    id: "6",
                    name: "İptal Edildi",
                    badgStyle : "danger"
                }
            ],
            badgClass : "danger"
        };
    }

    componentDidMount() {
        this.props.getOrders(this.props.phone);
    }


    handleDetails(order_id) {
        this.props.getOrderdetails(order_id);
    }

    render() {
        if(this.props.isLogin){
        if (this.props.orders) {
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
            <div style={{width: '100%',
            height: '880px',
            background: 'white'  }} >
            <div>
                <Header />
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
    renderOrders() {

        console.log(this.props.orders);

        const orderItemsList = this.props.orders[0].map((orderArr, index) => {
            const badg = this.state.orderStatus.map((status) => {
               if(orderArr.order_status_id === status.id)
                 return <td key={status.id} ><Badge variant={status.badgStyle}>{status.name}</Badge></td>
            })
            return (
                <tr key={orderArr.order_id} >
                    <th>{index + 1}</th>
                    <td>{orderArr.product_count}</td>
                    <th><span style={{ color: 'green' }} > {orderArr.total_price} </span> TL </th>
                    <td>{orderArr.date_added}</td>
                    {badg}
                    <td><Link to="/details" > <Button onClick={this.handleDetails.bind(this, orderArr.order_id)} variant="primary" size="sm" >ayrıntılar</Button></Link></td>
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
                                <th>Ürün sayısı</th>
                                <th>Toplam fiyat</th>
                                <th>tarih</th>
                                <th>durum</th>
                                <th>ayrıntılar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItemsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders.orders,
        phone: state.auth.userPhone,
        isLogin: state.auth.isLogin
    }
}
export default connect(mapStateToProps, { getOrders, getOrderdetails })(Orders);
