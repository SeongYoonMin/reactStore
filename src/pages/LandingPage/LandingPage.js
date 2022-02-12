import React, { useEffect, useState } from 'react';
import clayful from 'clayful/client-js'
import "../../css/LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
    let Product = clayful.Product;
    const [items, setItems] = useState([]);

    useEffect(() => {
        let options = {
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
        <section className="product-grid">
        <div className="grid-container">
            <h2>Product</h2>
            <div className="grid">{renderCards}</div>
        </div>
        </section>
    </div>
    );
}

export default LandingPage