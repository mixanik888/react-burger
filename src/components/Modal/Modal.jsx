import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

export default function Modal({ onClose, children }) {
  
  React.useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  },[onClose]);

  return createPortal(
    <>
      <ModalOverlay onMouseDown={onClose} />
      <div className={styles.modal}>
        {children}
        <div className={styles.icon}>
          <CloseIcon onClick={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
