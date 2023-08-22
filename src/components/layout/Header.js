import { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import styles from "./Header.module.css";

function Header() {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals Order</h1>
        <HeaderCartButton>Cart</HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="meals" />
      </div>
    </Fragment>
  );
}

export default Header;
