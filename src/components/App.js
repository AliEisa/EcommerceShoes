import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
//import { Router, Route, IndexRoute, browserHistory} from 'react-router';


import Cart from './cart';
import Orders from './orders';
import Homepage from './homepage';
import SigninPage from './SigninPage';
import SignupPage from './signupPage';
import OrderDetails from './orderDetails';
import Category from './category' ;

// basename="/directory-name/"

const App = () => {
    return(
    <div>
        <BrowserRouter >
        <div>   
        <Route path="/" exact component={SigninPage}/>
        <Route path="/homepage" component={Homepage} />
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={SigninPage} />
        <Route path="/details" component={OrderDetails} />
        <Route path="/category/:catId"  component={Category}/>
        <Route path="/cart"  component={Cart}/>
        <Route path="/orders"  component={Orders}/>
        </div>
        </BrowserRouter>
    </div>
    );
}

export default App;