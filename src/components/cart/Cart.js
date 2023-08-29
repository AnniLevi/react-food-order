import { useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import styles from "./Cart.module.css";

const apiUrl = process.env.REACT_APP_API_URL;

function Cart({ onClose }) {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    //TODO
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button-alt"]} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={submitOrderHandler} onCancel={onClose} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
}

export default Cart;
