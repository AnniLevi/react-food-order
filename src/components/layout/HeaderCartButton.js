import styles from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

function HeaderCartButton() {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>TotalAmount</span>
    </button>
  );
}

export default HeaderCartButton;