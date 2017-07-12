import * as types from './ActionTypes';
import axios from 'axios';
import getCookie from '../helper/getCookie';
import setCookieHour from '../helper/setCookieHour';


export const requestLogin = ( username , password ) => dispatch => {

    return axios.post( '/api/accounts/login', 
            { username : username, password : password}
        ).then(
            (res) => dispatch({
                type : types.REQUEST_LOGIN,
                message : res.data.message
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_LOGIN,
                message : error
            })
        
        );
    
};

export const requestStatus = () => dispatch => {

    return axios.get( '/api/accounts/status')
        .then(
            (res) => dispatch({
                type : types.REQUEST_STATUS,
                isLogin : res.data.isLogin
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_STATUS,
                error : error
            })
        
        );
    
};

export const requestLogout = () => dispatch => {

    return axios.get( '/api/accounts/logout')
        .then(
            (res) => dispatch({
                type : types.REQUEST_LOGOUT,
                isLogin : false
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_LOGOUT,
                error : error
            })
        
        );
    
};

export const addCart = ( productId , number, amount ) => {

    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ //있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
    }

    cartList[productId] = { 
        number : number , 
        amount : amount 
    };
    
    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    setCookieHour( "cartList" , JSON.stringify(cartList) , 3 );

    return ({
        type : types.ADD_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};

export const getCart = () => {

    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ //있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
    }

    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    return ({
        type : types.GET_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};

export const removeCart = ( cartId ) => {

    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ //있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
        delete cartList[cartId]; 
    }

    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    setCookieHour( "cartList" , JSON.stringify(cartList) , 3 );

    return ({
        type : types.REMOVE_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};