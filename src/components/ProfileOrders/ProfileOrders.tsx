import React from "react";
import styles from "./ProfileOrders.module.css";

export default function ProfileOrders() {
  return (
    <main className={styles.section}>
      <form className={styles.section}>
      <h3 className={`${styles.title} text text_type_main-medium`}>
        Здесь будет история заказа
      </h3>
      </form>
    </main>
  );
}
