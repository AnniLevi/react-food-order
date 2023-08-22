import styles from "./Cart.module.css";
import Modal from "../ui/Modal";

function Cart({ onClose }) {
  const items = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>ActualAmount</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={onClose}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
