import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.css";

function MealItem({ id, name, description, price }) {
  const cartCtx = useContext(CartContext);

  const mealPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{mealPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
