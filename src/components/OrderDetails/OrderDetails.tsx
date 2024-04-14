import React from "react";
import styles from "./OrderDetails.module.css";
import image from "../../images/logo192.png";
import { useSelector } from "../../services/store";

export default function OrderDetails() {

  const orderD = useSelector((store) => store.order);


  if (orderD.loading || orderD.order === null) {
    return <h2>Заказ обрабатывается...</h2>;
  }

  if (!orderD.loading && orderD.error !== null) {
    return <h2>error: {orderD.error?.message}</h2>;
  }

  const numberOrder =  (orderD.order !== undefined ? orderD.order.number :"")

  return (
    <div className={styles.order}>
      <h2 className={`${styles.title} text text_type_digits-large`}>
       {numberOrder}
      </h2>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>
        идентификатор заказа
      </h3>
      <img className={styles.image} src={image} alt="Заказ готовится" />
      <p className="text text_type_main-small">
        Ваш {(orderD.order !== undefined ? (orderD.order as {name: string}).name:"")} начали готовить
      </p>
      <p className={`${styles.message} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
