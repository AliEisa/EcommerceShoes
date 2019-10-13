export default (state = { orders: [] , total_amount : 0 , total_payment : 0 , total_invoice : 0}, action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        orders: [action.payload]
      };
    case 'GET_ORDER_DETAILS':
      return {
        ...state,
        order_details: [action.payload]
      };
    case 'GET_DETAILS_FAIL':
      return {
        ...state,
        details_message: action.payload,
        order_details: []
      };
      case 'GET_INVOICE':
      return {
        ...state,
        total_amount: action.amount,
        total_payment: action.payment,
        total_invoice: action.invoice
      };
      case 'GET_INVOICE_FAIL':
      return {
        ...state,
        total_amount: action.amount,
        total_payment: action.payment,
        total_invoice: action.invoice
      };
    default:
      return state;
  }
};

