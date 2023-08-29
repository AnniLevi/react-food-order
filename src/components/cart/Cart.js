import { Fragment, useContext, useState } from "react";
import CartContext from "../../context/cart-context";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import styles from "./Cart.module.css";
import useHttp from "../../hooks/use-http";

function Cart({ onClose }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const {
    isLoading: isSubmitting,
    error: httpError,
    sendRequest: confirmOrder,
  } = useHttp();

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
    const requestConfig = {
      url: "orders.json",
      method: "POST",
      body: {
        userData,
        orderedItems: cartCtx.items,
      },
    };
    confirmOrder(requestConfig);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  if (httpError) {
    return (
      <Modal onClick={onClose}>
        <p className={styles.OrderError}>{httpError}</p>
        <div className={styles.actions}>
          <button className={styles["button"]} onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

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

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={submitOrderHandler} onCancel={onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles["button"]} onClick={onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
