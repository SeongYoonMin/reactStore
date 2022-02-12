import { useEffect, useState } from "react";
import { useParams } from "react-router"
import clayful from 'clayful/client-js'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../css/DetailProductPage.css'

function DetailProductPage () {
    const params = useParams();
    const productId = params.productId;
    const [count, setCount] =useState(1);

    const handleQuantityClick = (type) => {
        if (type === "plus") {
            setCount((prev) => prev +1);
        } else {
            if (count === 1) return;
            setCount((prev) => prev - 1);
        }
    };

    let Product = clayful.Product;

    const [item, setItem] = useState([]);

    useEffect(() => {
        Product.get(productId, "", function (err, result){
            if(err) {
                console.log(err.code);
            }
            let data = result.data;
            setItem(data);
        });
    }, [productId]);
    
    return (
        <div className="pageWrapper">
            <Row>
                <Col md>
                    <div>
                        <img className="productImg" src={item.thumbnail?.url} alt={item.name} />
                    </div>
                </Col>
                <Col md>
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
                </Col>
            </Row>

            <div dangerouslySetInnerHTML={{__html: item.description}} />
        </div>
    )
}

export default DetailProductPage