import styles from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isValidPostal = (value) => value.trim().length === 6;

function CheckoutForm({ onConfirm, onCancel }) {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
  } = useInput(isValidPostal);

  const formIsValid =
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredAddressIsValid &&
    enteredPostalIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

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
    !nameInputHasError ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    !cityInputHasError ? "" : styles.invalid
  }`;
  const addressControlClasses = `${styles.control} ${
    !addressInputHasError ? "" : styles.invalid
  }`;
  const postalControlClasses = `${styles.control} ${
    !postalInputHasError ? "" : styles.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <p>Please enter a valid full name</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputHasError && <p>Please enter a valid city</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressInputHasError && <p>Please enter a valid address</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalInputHasError && (
          <p>Please enter a valid postal code (6 characters long)</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
