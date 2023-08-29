import { useRef, useState } from "react";
import styles from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isValidPostal = (value) => value.trim().length === 6;

function CheckoutForm({ onConfirm, onCancel }) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    city: true,
    address: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalIsValid = isValidPostal(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      address: enteredAddressIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid;
    if (!formIsValid) {
      return;
    }

    //submit cart data
    onConfirm({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${styles.control} ${
    formInputValidity.name ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    formInputValidity.city ? "" : styles.invalid
  }`;
  const addressControlClasses = `${styles.control} ${
    formInputValidity.address ? "" : styles.invalid
  }`;
  const postalControlClasses = `${styles.control} ${
    formInputValidity.postal ? "" : styles.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid full name</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Please enter a valid postal code (6 characters long)</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default CheckoutForm;
