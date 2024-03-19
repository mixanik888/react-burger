import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

type TModal = {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<TModal> = ({ onClose, children }) => {
  
  React.useEffect(() => {
    const closeByEsc = (e:KeyboardEvent) => {
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
          <CloseIcon type="primary" onClick={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("root") as Element
  );
}

export default Modal;