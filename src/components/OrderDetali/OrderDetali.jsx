import React from "react";
import styles from './OrderDetali.module.css';
import image from '../../images/logo192.png';
import { useSelector } from "react-redux";

export default function OrderDetails() {

  const {loading, order, error} = useSelector(store => store.Order);

  if (loading || order === null) {
    return (
      <h2>Загрузка...</h2>
    );
  }

  if (!loading && error) {
    return (
      <h2>error: {error}</h2>
    );
  } 

  return (
    <div className={styles.order}>
      <h2 className={`${styles.title} text text_type_digits-large`}>{order.order.number}</h2>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</h3>
      <img className={styles.image}
        src={image}
        alt='Заказ готовится'
      />
      <p className="text text_type_main-small">
        Ваш {order.name} начали готовить
      </p>
      <p className={`${styles.message} text text_type_main-small`} >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>

  )
}