import React, { FC, MouseEventHandler } from "react";
import styles from "./ModalOverlay.module.css";


type TModalOverlay = {
  onMouseDown: MouseEventHandler;
}

const ModalOverlay: FC<TModalOverlay> = ({ onMouseDown }) => {
  return <div className={styles.overlay} onMouseDown={onMouseDown} data-testId="modalOverlay"></div>;
}


export default ModalOverlay;