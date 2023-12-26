import React from "react";
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({onMouseDown}) {

  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onMouseDown: PropTypes.func.isRequired
}
