import styles from "./MealItemForm.module.css";
import Input from "../../ui/Input";

function MealItemForm({ id }) {
  return (
    <form className={styles.form}>
      <Input
        config={{
          id: "amount_" + id,
          label: "Amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
