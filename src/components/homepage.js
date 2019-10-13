import React from 'react';
import { connect } from 'react-redux';
import { getAllProducts , getCategory } from '../actions';
import { Redirect } from 'react-router-dom';

import Header from './header';
import Products from './products';
import Footer from './footer';

class Homepage extends React.Component {

    componentDidMount(){
        this.props.getAllProducts();
    }

    renderHomePage() {
        return(
            <div style={{width: '100%',
            height: '880px',
            background: 'white'  }} >
            <div>
               <Header />
               <Products />
               <Footer />
            </div>
            </div>
        );
    }

    render() {
        if (this.props.isLogin) {
            return this.renderHomePage()
        }
        else {
            return <Redirect to="/login" />
        }
    }
}

function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin
    }
}

export default connect(mapStateToProps, { getAllProducts , getCategory })(Homepage);
