import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping, total, setTotal }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * parseFloat(item.cost.substring(1)); // Removing the "$" and converting to a number
    });
    return total.toFixed(2);
  };
  const handleCheckoutShopping = (e) => {
    alert("Coming Soon");
  };
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    setTotal((prev) => prev + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
      setTotal((prev) => prev - 1);
    } else if (item.quantity === 1) {
      handleRemove(item);
      setTotal((prev) => prev - 1);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    setTotal((prev) => prev - item.quantity);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
        <br />
        Total Items:{total}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => {
            handleCheckoutShopping();
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
