import { combineReducers } from 'redux';
import productsReducers from './productsReducers';
import cartReducers from './cartReducers';
import orderReducers from './orderReducers';
import authReducer from './authReducer';

export default combineReducers(
    {
        products: productsReducers,
        cart: cartReducers,
        orders: orderReducers,
        auth: authReducer
    }
);