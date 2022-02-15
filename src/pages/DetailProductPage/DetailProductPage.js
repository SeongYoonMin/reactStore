import { useEffect, useState } from "react";
import { useParams } from "react-router"
import clayful from 'clayful/client-js'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../css/DetailProductPage.css'
import ProductInfos from "./Sections/ProductInfos";

function DetailProductPage () {
    const params = useParams();
    const productId = params.productId;

    
    
    const [item, setItem] = useState([]);
    
    useEffect(() => {
        let Product = clayful.Product;
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
                    <ProductInfos items={item}/>
                </Col>
            </Row>

            <div dangerouslySetInnerHTML={{__html: item.description}} />
        </div>
    )
}

export default DetailProductPage