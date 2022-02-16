import React from "react"
import '../../../css/CartItem.css'

function CartItem ({item, index, buttonHandler, deleteItemHandler}) {
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
                <button className="plus-btn" type="button" name="button" onClick={() => buttonHandler("plus", index)}>
                    +
                </button>
                <input type="text" readOnly name="name" value={item.quantity.raw} />
                <button className="minus-btn" type="button" name="button" onClick={() => buttonHandler("minus", index)}>
                    -
                </button>
            </div>

            <div className="total-price">₩ {(item.price.original.raw * item.quantity.raw)}</div>
            <div className="buttons">
                <span className="delete-btn" onClick={() => deleteItemHandler(item._id, item.price.original.raw)}>X</span>
            </div>
        </div>
    )
}

export default CartItem