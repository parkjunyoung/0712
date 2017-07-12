import * as types from '../actions/ActionTypes';

const initialState = {
    count : 0 ,
    cartList : {},
    totalAmount : 0
};

const Cart = ( state = initialState , action ) => {
    switch(action.type) {
        case types.ADD_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        case types.GET_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        case types.REMOVE_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        default :
            return state;
    }
};

export default Cart;