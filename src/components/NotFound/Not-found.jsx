import React from "react";
import { Link } from "react-router-dom";
//import styles from ".css";
import styles from "./Not-found.module.css";

export default function NotFound404() {
  return (
    <main className={styles.main}>
      <form className={styles.main}>
        <h3 className={`${styles.title} text text_type_main-medium`}>
          Oops! 404 Error
      </h3>
          <p>The page you requested does not exist</p>
          <br />
          <br />
       
           
          <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
          check the address or try?
          <Link to="/" className={`${styles.link} ml-2`}>
          Конструктор
          </Link>
        </p>
      </form>
    </main>


  );
}