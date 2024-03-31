import React from "react";
import { ListOrdersCart } from "../ListOrdersCart/ListOrdersCart";
import styles from "./ListOrders.module.css";
import {  useDispatch, useSelector } from "../../services/store";
import { TOrderKey } from "../../utils/types";
import { ApiConfig } from "../../utils/burger-api";
import { onClose, wsDisconnect, wsInit } from "../../services/actions/middlewareActions";


export default function LisOrders() {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    
    dispatch(wsInit(`${ApiConfig.baseURLWS}/all`));

    return() => {
      dispatch(onClose());
    }
    
  }, [dispatch]);
  
  const wsOrders = useSelector((store) => store.wsOder);
  const doneOrder = React.useMemo(
    () => wsOrders.orders.filter((item: TOrderKey) => item.status === "done"),
    [wsOrders.orders]
  );

  const NoDoneOrder = React.useMemo(
    () => wsOrders.orders.filter((item: TOrderKey) => item.status !== "done"),
    [wsOrders.orders]
  );

  return (
    <main className={styles.content}>
      <section className={styles.constructor1}>
        <p className={`${styles.title} text text_type_main-large mt-10 mb-9`}>
          Лента заказов
        </p>
        <div className={styles.scroll}>

          {wsOrders.orders.map((element: TOrderKey, index: number) => {
            return <ListOrdersCart key={element._id} actionOrder={element} isProfileUser={false}/>
          })}
        </div>
      </section>
      <section className={styles.constructor1}>
        <div className={styles.constructor2}>
          <div>
            <p
              className={`${styles.title} text text_type_main-medium mt-10 mb-9`}
            >
              Готовы:
            </p>
            <div className={styles.constructor3}>
              {doneOrder.map((element: TOrderKey, index: number) => {
                if (index < 9) 
                {
                  return (
                    <p key={element.number} className="text text_type_digits-default">
                      {element.number}
                    </p>
                  );
                } else {return ""}
              })}
            </div>
          </div>
          <div>
            {" "}
            <p
              className={`${styles.title} text text_type_main-medium mt-10 mb-9`}
            >
              В работе:
            </p>
          </div>
        </div>
        <div className={styles.constructor3}>
          {NoDoneOrder.map((element: TOrderKey, index: number) => {
           if (index < 10) 
                {
                  return (
                    <p key={element.number} className="text text_type_digits-default">
                      {element.number}
                    </p>
                  );
                } else {return ""}
              })}
        </div>
        <div>
          <p
            className={`${styles.title} text text_type_main-medium mt-10 mb-9`}
          >
            Выполнено за все время:
          </p>
          <p className="text text_type_digits-large">{wsOrders.total}</p>
        </div>

        <div>
          <p
            className={`${styles.title} text text_type_main-medium mt-10 mb-9`}
          >
            Выполнено за сегодня:
          </p>
          <p className="text text_type_digits-large">{wsOrders.totalToday}</p>
        </div>
      </section>
    </main>
  );
}
