import React, { useState } from 'react'
import '../../../css/ProductInfos.css'

function ProductInfos({item}) {
    const [count, setCount] = useState(1);

    const handleQuantityClick = (type) => {
        if (type === "plus") {
            setCount((prev) => prev +1);
        } else {
            if (count === 1) return;
            setCount((prev) => prev - 1);
        }
    };
    if(!item) return (
        <h1> 상품을 준비중입니다. </h1>
    );
    return (
        <div>
            <p style={{color: "#df4800", marginBottom: 0}}>New</p>
            <h1 style={{marginBottom: 20}}>{item.name} 구입하기</h1>
            <h5>{item.summary} 개별 판매 가격 {item.price?.original.formatted}</h5>

            <div className="quantity">
                <p style={{fontWeight: 600, marginBottom: 5}}>수량</p>
                <button className="plus-btn" type="button" name="button" onClick={() => handleQuantityClick("plus")}>+</button>
                <input type="text" readOnly name="name" value={count} />
                <button className="minus-btn" type="button" name="button" onClick={() => handleQuantityClick("minus")}>-</button>
            </div>

            <br />

            <h3>총 상품 금액: {item.price?.original.raw * count}원</h3>

            <br />

            <div className="product-info-action">장바구니에 담기</div>
            <div className="product-info-action">바로 구매</div>
        </div>
    )
}

export default ProductInfos