import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ config }, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={config.id}>{config.label}</label>
      <input ref={ref} {...config} />
    </div>
  );
});

export default Input;
