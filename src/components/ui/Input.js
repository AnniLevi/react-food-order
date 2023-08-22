import styles from "./Input.module.css";

function Input({ config }) {
  return (
    <div className={styles.input}>
      <label htmlFor={config.id}>{config.label}</label>
      <input {...config} />
    </div>
  );
}

export default Input;
