import ReactDom from "react-dom";
import { Fragment } from "react";
import styles from "./Modal.module.css";

function Backdrop({ onClick }) {
  return <div className={styles.backdrop} onClick={onClick} />;
}

function ModalOverlay({ children }) {
  return <div className={styles.modal}>{children}</div>;
}

const portalElement = document.getElementById("overlays");

function Modal({ children, onClick }) {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClick={onClick} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </Fragment>
  );
}

export default Modal;
