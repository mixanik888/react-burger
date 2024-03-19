import React, { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

type TModalOverlay = {
  onMouseDown: MouseEventHandler;
}

const ModalOverlay: FC<TModalOverlay> = ({ onMouseDown }) => {
  return <div className={styles.overlay} onMouseDown={onMouseDown}></div>;
}


export default ModalOverlay;