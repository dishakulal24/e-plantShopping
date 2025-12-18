import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, decreaseQuantity } from "../redux/cartSlice";
import "./CartItem.css";

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addItem(item))}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total Amount: ₹{totalAmount}</h2>
        </>
      )}
    </div>
  );
};

export default CartItem;
