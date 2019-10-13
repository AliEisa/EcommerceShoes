export default (state = { cart: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state,
      cart: action.payload,
      totalAmount : totals(action.payload).amount,
      totalQty : totals(action.payload).qty 
      };
      case 'DELETE_CART_ITEM':
      return { ...state,
        cart: action.payload, 
        totalAmount : totals(action.payload).amount,
        totalQty : totals(action.payload).qty 
       };
    case 'UPDATE_CART':
    const currentProductToUpdate = [...state.cart]
    const indexToUpdate = currentProductToUpdate.findIndex(
      function (product) {
        return product.product_id === action.id;
      }
    )
    const newProductToUpdate = {...currentProductToUpdate[indexToUpdate],
      quantity: currentProductToUpdate[indexToUpdate].quantity + action.unit
    }
    let cartUpdate = [...currentProductToUpdate.slice(0, indexToUpdate), newProductToUpdate,
      ...currentProductToUpdate.slice(indexToUpdate + 1)]
    return { ...state,
      cart: cartUpdate,
      totalAmount : totals(cartUpdate).amount,
      totalQty : totals(cartUpdate).qty  
     };
     case 'CLEAN_CART':
     return {cart: []}
    default:
      return state;
  }
};

export function totals(payloadArr){
  const totalAmount = payloadArr.map( function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function (a, b){
    return a + b;
  }, 0);

  const totalQty = payloadArr.map( function(qty){
    return qty.quantity;
  }).reduce(function (a, b){
    return a + b;
  }, 0);

  return {amount: totalAmount.toFixed(2), qty: totalQty }
}