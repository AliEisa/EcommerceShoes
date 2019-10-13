export default (state = { isLogin: false , message: '' ,isRegister : false ,registerMessage: '' , userPhone: '' , id :0}, action) => {
    switch (action.type) {
        case 'DO_LOGIN':
        return {...state, isLogin : true , message : action.payload , userPhone: action.phone , user_name: action.user_name , id : action.id}
        case 'LOGIN_FAIL':
        return {...state, isLogin : false , message : action.payload , userPhone: action.phone , user_name:'' }
        case 'LOGOUT':
        return {...state, isLogin : false , message : '' , userPhone: '' , registerMessage : '' , isRegister : false , user_name: '',id:0 }
        case 'DO_REGISTER':
        return {...state, isRegister : true , isLogin : false , registerMessage : action.payload , userPhone: action.phone , user_name: action.user_name}
        case 'REGISTER_FAIL':
        return {...state, isRegister : false , registerMessage : action.payload , userPhone: action.phone , user_name: ''}

        default:
            return state ;
    }
}
