import React from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ListOrdersCart.module.css";
import { useSelector } from "../../services/store";
import { TElement, TOrderKey } from "../../utils/types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

type TConstructorElement = {
  isProfileUser: boolean;
  actionOrder: TOrderKey;
};

export const ListOrdersCart: React.FC<TConstructorElement> = ({ actionOrder,  isProfileUser}) => {
 
  const location = useLocation();
  const data = useSelector((store) => store.data.data1);

    const ItemOrderIngredients = actionOrder.ingredients;

  const PriceTotal = ItemOrderIngredients.reduce(
    (acc: number, currentValue: string) =>
      acc +
      (data.filter((item: TElement) => item._id === currentValue).length > 0
        ? data.filter((item: TElement) => item._id === currentValue)[0].price
        : 0),
    0
  );

  const id: number = actionOrder.number;

  const toRoot:string = (isProfileUser !== true)? `/feed/${id}`:`/profile/orders/${id}`;

  //if (isProfileUser) {const toRoot:string = `/feed/${id}`} else {const toRoot:string = `/feed/${id}`}

  return (
    <div className={styles.element}>
      <div className={styles.element__row}>
        <div className="text text_type_digits-default">
          
          <Link
            to={toRoot}
            key={id}
            state={{ background: location }}
            className={styles.link}
          >
            {"#" + id}
          </Link>
        </div>
        <FormattedDate date={new Date(actionOrder.updatedAt)} />
      </div>
      <div className={styles.element__row_center}>
        <div className="text text_type_main-default">{actionOrder.name}</div>
      </div>

      <div className={styles.element__row_bottom}>
        <div className={styles.element__row_Img}>
          {ItemOrderIngredients.map((element: string, index: number) => {
            if (index > 6) {
              return (
                <p
                  key={element + "_" + index}
                  className="text text_type_digits-default"
                >
                  {" "}
                  {ItemOrderIngredients.length - 1 === index
                    ? "+" + (index - 6)
                    : ""}{" "}
                </p>
              );
            } else {
              return (
                <img
                  key={element + "_" + index}
                  className={styles.element__image}
                  src={
                    data.filter((item: TElement) => item._id === element)
                      .length > 0
                      ? data.filter((item: TElement) => item._id === element)[0]
                          .image
                      : ""
                  }
                  alt={
                    data.filter((item: TElement) => item._id === element)
                      .length > 0
                      ? data.filter((item: TElement) => item._id === element)[0]
                          .name
                      : ""
                  }
                />
              );
            }
          })}
        </div>
        <div className={styles.element__price}>
          {PriceTotal}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
