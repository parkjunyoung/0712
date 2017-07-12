import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getDate from '../helper/getDate';
import numberFormat from '../helper/numberFormat';
import CountBox from './CountBox';


class ProductModal extends Component {

    constructor() {
        super();
        this.state = { 
            product : [],
            cartNum : 1,
            totalPrice : 0,
            lastPrice : 0
        };
        this.historyBack = this.historyBack.bind(this);
        this.changeCartNum = this.changeCartNum.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount(){

        axios.get(`/api/admin/products/${this.props.match.params.id}`, {
        }).then( (res) => {
            let lastPrice = (
                                res.data.product.sale_price ?
                                res.data.product.sale_price :
                                res.data.product.price 
                            );
            this.setState({
                product: res.data.product,
                totalPrice : lastPrice,
                lastPrice : lastPrice
            });
        }).catch( (error) => {
            console.log(error); 
        });

    }

    historyBack(){
        this.props.history.push('/');
    }

    changeCartNum( type , event ){
        event.preventDefault();
        let cartNum = this.state.cartNum;
        if(type==="plus"){
            cartNum++;
        }else if(type==="minus"){
            cartNum -= ( (cartNum==1) ? 0 : 1 ); 
        }
        this.setState({
            cartNum : cartNum,
            totalPrice : (this.state.lastPrice * cartNum)
        });
    }

    addCart(){
        if(confirm('장바구니에 담겠습니까?')){ 
            this.props.addCart( 
                this.props.match.params.id , 
                this.state.cartNum ,  
                this.state.totalPrice
            );
            alert("장바구니에 담겼습니다.");
        }
    }

    render(){

        let createdAt = getDate(this.state.product.createdAt);

        return (
            <Modal show={true} onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        {this.state.product.product_name}
                            - 판매가 
                            { 
                                this.state.product.sale_price ?
                                numberFormat(this.state.product.sale_price) :
                                numberFormat(this.state.product.price) 
                            } 원
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        작성일 :
                        {createdAt.year} - {createdAt.month} - {createdAt.day}
                    </div>
                    <img src={`/uploads/${this.state.product.thumbnail}`} alt=""/>
                    <div>{this.state.product.description}</div>

                    <hr />
                    
                    <CountBox 
                        cartNum = { this.state.cartNum }
                        totalPrice = { this.state.totalPrice }
                        changeCartNum = { this.changeCartNum } 
                    />
                    
                   
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ this.historyBack }>목록으로</Button>
                    <Button  onClick={ () => { this.addCart() } } 
                    className="btn btn-primary">장바구니 담기</Button>
                </Modal.Footer>

            </Modal>

        );
    }
}

export default ProductModal;