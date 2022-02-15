import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import Alert from 'react-bootstrap/Alert'
import '../../../css/ProductInfos.css';
import clayful from 'clayful/client-js'

function ProductInfos({items}) {
    const [count, setCount] = useState(1);
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    

    const handleQuantityClick = (type) => {
        if (type === "plus") {
            setCount((prev) => prev +1);
        } else {
            if (count === 1) return;
            setCount((prev) => prev - 1);
        }
    };

    const handleActionClick = (type) => {
        if(!isAuth) {
            alert("먼저 로그인해주세요");
            navigate('/login');
            return;
        }
        let Cart = clayful.Cart;
    
        let payload = {
            product: items._id,
            variant: items.variants[0]._id,
            quantity: count,
            shippingMethod: items.shipping.methods[0]._id
        };
    
        let options = {
            customer: localStorage.getItem('accessToken'),
        };
    
        Cart.addItemForMe(payload, options, function(err, result) {
            if(err) {
                console.log(err.code);
                return;
            }
    
            if(type === "cart") {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            } else {
                setTimeout(()=> {
                    navigate("/user/cart");
                }, 1000);
            }
        });
    }

    if(!items) return (
        <h1> 상품을 준비중입니다. </h1>
    );
    return (
        <div>
            {show && (
                <Alert variant="info">
                    <Alert.Heading>상품이 장바구니에 담겼습니다.</Alert.Heading>
                    <p>장바구니에서 확인해주세요.</p>
                </Alert>
            )}
            <p style={{color: "#df4800", marginBottom: 0}}>New</p>
            <h1 style={{marginBottom: 20}}>{items.name} 구입하기</h1>
            <h5>{items.summary} 개별 판매 가격 {items.price?.original.formatted}</h5>

            <div className="quantity">
                <p style={{fontWeight: 600, marginBottom: 5}}>수량</p>
                <button className="plus-btn" type="button" name="button" onClick={() => handleQuantityClick("plus")}>+</button>
                <input type="text" readOnly name="name" value={count} />
                <button className="minus-btn" type="button" name="button" onClick={() => handleQuantityClick("minus")}>-</button>
            </div>

            <br />

            <h3>총 상품 금액: {items.price?.original.raw * count}원</h3>

            <br />

            <div className="product-info-action" onClick={() => handleActionClick("cart")}>장바구니에 담기</div>
            <div className="product-info-action" onClick={() => handleActionClick("pay")}>바로 구매</div>
        </div>
    )
}

export default ProductInfos