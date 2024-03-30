import React from "react";
import { useParams } from "react-router";
import styles from "./ListOrdersDetails.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { findOrderToNumber } from "../../services/actions/actions";
import { TOrderKey, TElement } from "../../utils/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ListOrdersDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data1);

  React.useEffect(() => {
    if (id !== undefined) dispatch(findOrderToNumber(id));
  }, [dispatch, id]);

  const dataOrders = useSelector((store) => store.findOrder);

  if (dataOrders.loading) {
    return <h2>Загрузка...</h2>;
  }

  if (!dataOrders.loading && dataOrders.error) {
    return <h2>error: {dataOrders.error}</h2>;
  }

  if (dataOrders.orders === undefined) {
    return <h2>error: Нет данных</h2>;
  }
  if (dataOrders.orders.length === 0) {
    return <h2>error: Нет данных</h2>;
  }
  const dataOrder: TOrderKey = dataOrders.orders[0];
  const ItemOrderIngredients = dataOrders.orders[0].ingredients;

  const PriceTotal = ItemOrderIngredients.reduce(
    (acc: number, currentValue: string) =>
      acc +
      (data.filter((item: TElement) => item._id === currentValue).length > 0
        ? data.filter((item: TElement) => item._id === currentValue)[0].price
        : 0),
    0
  );

  return (
    <main className={styles.main}>
      <div>
        <h3 className={`${styles.title} text text_type_main-medium`}>#{id}</h3>
        <div className={`${styles.text} text text_type_main-medium`}>
          {dataOrder.name}
        </div>
        <div className={`${styles.text} text text_type_main-default`}>
          {dataOrder.status === "done" ? "Выполнен" : "Готовится"}
        </div>
        <div className={`${styles.text} text text_type_main-medium`}>
          Состав:
        </div>
      </div>
      <div className={styles.scroll}>
        {ItemOrderIngredients.map((element: string, index: number) => {
          return (
            <div className={styles.row}>
              <img
                key={element + "_" + index}
                className={styles.element__image}
                src={
                  data.filter((item: TElement) => item._id === element).length >
                  0
                    ? data.filter((item: TElement) => item._id === element)[0]
                        .image
                    : ""
                }
                alt={
                  data.filter((item: TElement) => item._id === element).length >
                  0
                    ? data.filter((item: TElement) => item._id === element)[0]
                        .name
                    : ""
                }
              />
              <div className={`text text_type_main-default`}>
                {data.filter((item: TElement) => item._id === element).length >
                0
                  ? data.filter((item: TElement) => item._id === element)[0]
                      .name
                  : ""}{" "}
              </div>
              <div className={styles.price}>
                1 x{" "}
                {data.filter((item: TElement) => item._id === element).length >
                0
                  ? data.filter((item: TElement) => item._id === element)[0]
                      .price
                  : ""}
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.row_bottom9}>
 
        <FormattedDate date={new Date(dataOrder.updatedAt)} />
        <div> </div>
        <div className={styles.price}>
          {PriceTotal}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </main>
  );
}
