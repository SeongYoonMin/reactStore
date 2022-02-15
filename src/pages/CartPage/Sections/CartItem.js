import React from "react"
import '../../../css/CartItem.css'

function CartItem ({item, index}) {
    return (
        <div className="item">
            <div className="image">
                <img src={item.product?.thumbnail.url} alt={item.product.name} />
            </div>

            <div className="description">
                <span>{item.product.name}</span>
                <span>ipsan</span>
                <span>loang</span>
            </div>

            <div className="quantity">
                <button className="plus-btn" type="button" name="button">
                    +
                </button>
                <input type="text" readOnly name="name" value={item.quantity.raw} />
                <button className="minus-btn" type="button" name="button">
                    -
                </button>
            </div>

            <div className="total-price">₩ {item.price.original.raw}</div>
            <div className="buttons">
                <span className="delete-btn">X</span>
            </div>
        </div>
    )
}

export default CartItem