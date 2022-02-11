import React, { useEffect, useState } from 'react';
import clayful from 'clayful/client-js'
import "../../css/LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
    var Product = clayful.Product;
    const [items, setItems] = useState([]);

    useEffect(() => {
        var options = {
            query: {
            page: 1,
            },
        };

        Product.list(options, function (err, response) {
            if (err) {
            console.log(err.code);
            console.log(err.message);
            return;
            }
            console.log(response.data);
            setItems(response.data);
        });
    }, []);

    const renderCards = items.map((item) => {
        if (item) {
            console.log(item);
            return (
            <div key={item._id} className="grid-product">
                <Link to={`/product/${item._id}`}>
                <img src={item.thumbnail.url} alt={item.name} />
                <div className="grid-detail">
                    <p>{item.name}</p>
                    <p>{item.price.original.formatted}</p>
                </div>
                </Link>
            </div>
            );
        }
    });

    return (
    <div>
        <section className="welcome">
        <h1>좋아하는 Apple 제품을 구입하는 가장 좋은 방법</h1>
        </section>

        <section className="product-grid">
        <div className="grid-container">
            <h2>Product</h2>
            <div className="grid">{renderCards}</div>
        </div>
        </section>

        <section className="first-hightlight-wrapper">
        <div className="container">
            <div className="links-wrapper">
            <ul>
                <li>
                <a href="/">Learn more</a>
                </li>
                <li>
                <a href="/">Buy</a>
                </li>
            </ul>
            </div>
        </div>
        </section>
    </div>
    );
}

export default LandingPage