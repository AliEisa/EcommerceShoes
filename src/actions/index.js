import { toast } from 'react-toastify';
import axios from 'axios';
export const getAllProducts = () => {
    return (dispatch) => {
          const url = 'http://localhost/api/getProduct.php';
      axios.get(url).then( res => {
        const { data } = res ;
        if (data.success === 1){

              dispatch({ type: 'GET_ALL_PRODUCTS', payload: { p:data.data , r: data.rec }  });
        }
      }).catch(function (error) {
            console.log(error);
        });



    };
};

export const addProduct = () => {
    return {
        type: 'ADD_PRODUCT',
        payload: {
            id: 4,
            title: 'fourth product title ',
            description: 'fourth product description',
            price: 60
        }
    };
};

export const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: productId
    };
};

export const getCategory = () => {
    return {
        type: 'GET_CATEGORY'
    };
};

export const getProducts = (category) => {
    return {
        type: 'GET_PRODUCTS',
        payload: category
    };
};

export const getRec = (id) => {
    return {
        type: 'GET_REC',
        payload:  id
    };
};

export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const updateCart = (id, unit) => {
    return {
        type: 'UPDATE_CART',
        id: id,
        unit: unit
    };
};

export const deleteCartItem = (cart) => {
    return {
        type: 'DELETE_CART_ITEM',
        payload: cart
    };
};

export const cleanCart = () => {
    return {
        type: 'CLEAN_CART'
    };
};

export const createOrder = (order , totalAmount , phone , product_count) => {

    return (dispatch) => {
        const url = 'http://daisyarea.com/api/newOrder.php' ; // site that doesn’t send Access-Control-*
       // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch( url,
            {
                method: 'POST',
                mode: 'no-cors',
                headers:
                {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'multipart/form-data'
                },
                body:JSON.stringify({phone, total_price:totalAmount,cart:order , product_count})
            }
        ).then((resp) => resp.json())
            .then(function (data) {
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const getOrders = ( phone ) => {

    return (dispatch) => {
        const url = 'http://daisyarea.com/api/getOrderByUser.php' ; // site that doesn’t send Access-Control-*
       // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch( url,
            {
                method: 'POST',
                mode: 'no-cors',
                headers:
                {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'multipart/form-data'
                },
                body:JSON.stringify({phone})
            }
        ).then((resp) => resp.json())
            .then(function (data) {
                dispatch({ type: 'GET_ORDERS', payload: data.orders })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const getOrderdetails = ( order_id ) => {

    return (dispatch) => {
        const url = 'http://daisyarea.com/api/getProductsByOrder.php' ; // site that doesn’t send Access-Control-*
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch( url,
            {
                method: 'POST',
                mode: 'no-cors',
                headers:
                {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'multipart/form-data'
                },
                body:JSON.stringify({order_id})
            }
        ).then((resp) => resp.json())
            .then(function (data) {
                if (data.success === 1)
                dispatch({ type: 'GET_ORDER_DETAILS', payload: data.products })
                else if (data.success === 0)
                dispatch({ type: 'GET_DETAILS_FAIL', payload: data.message })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const userSignin = (user) => {
    return (dispatch) => {
  //    dispatch({ type: 'DO_LOGIN', payload: 'k' , phone: user.phone_number , user_name : 'ali' })
       const url = 'http://localhost/api/login.php?phone='+user.phone_number+'&password='+user.password ; // site that doesn’t send Access-Control-*
    //    const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.get(url).then( res => {
          const { data } = res ;
          if (data.success === 1){
              toast.success("logging in", {
                  position: toast.POSITION.TOP_RIGHT
                });
              dispatch({ type: 'DO_LOGIN', payload: data.message , phone: user.phone_number , user_name : data.user_name , id:data.id })
          }
              else if (data.success === 0){
              if(data.message === "Invalid password !"){
              toast.error(data.message, {
                  position: toast.POSITION.TOP_RIGHT
                });}
                else if(data.message === "This Account not found !"){
                  toast.error(data.message, {
                      position: toast.POSITION.TOP_RIGHT
                    });
                }
              dispatch({ type: 'LOGIN_FAIL', payload: data.message ,phone:'' })
          }
        }).catch(function (error) {
              console.log(error);
          });

    };
};

export const dologin = () => {
    return {
        type: 'DO_LOGIN'
    }
};

export const login_fail = () => {
    return {
        type: 'LOGIN_FAIL'
    }
};

export const userSignup = (user) => {
    return (dispatch) => {
        const url = 'http://daisyarea.com/api/register.php?phone_number=' + user.phone_number + '&password=' + user.password
        + '&name=' + user.user_name + '&title=' + user.title + '&location=' + user.address + '&email=' + user.email; // site that doesn’t send Access-Control-*
       // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch( url,
            {
                method: 'GET',
                mode: 'no-cors',
                headers:
                {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((resp) => resp.json())
            .then(function (data) {
                if (data.success === 1)
                    dispatch({ type: 'DO_REGISTER', payload: data.message , phone: user.phone_number , user_name : data.user_name })
                else if (data.success === 0){
                    if(data.message === "this Account is already exist "){
                        toast.error("bu hesap zaten var", {
                            position: toast.POSITION.TOP_RIGHT
                          });}
                          else if(data.message === "Registration failed "){
                            toast.error("Kayıt başarısız", {
                                position: toast.POSITION.TOP_RIGHT
                              });
                          }
                    dispatch({ type: 'REGISTER_FAIL', payload: data.message ,phone:'' })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};
/*
export const getInvoice = (phone) => {
    return (dispatch) => {
        const url = 'http://daisyarea.com/api/getInvoice.php' ; // site that doesn’t send Access-Control-*
      //  const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch( url,
            {
                method: 'POST',
                mode: 'no-cors',
                headers:
                {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'multipart/form-data'
                },
                body:JSON.stringify({phone})
            }
        ).then((resp) => resp.json())
            .then(function (data) {
                if (data.success === 1)
                    dispatch({ type: 'GET_INVOICE', amount: data.total_amount , payment: data.total_payment , invoice : data.invoice })
                else if (data.success === 0)
                    dispatch({ type: 'GET_INVOICE_FAIL', amount: '0' , payment: '0' , invoice : '0' })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};
*/
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};
