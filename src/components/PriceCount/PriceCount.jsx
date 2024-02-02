import React, { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './PriceCount.module.css';
import { useSelector } from "react-redux";

export default function PriceCount() {
  
  const data = useSelector(store => store.Burger.Ingredients);
  const Bun = useSelector(store => store.Burger.bun);

  const PriceTotal = useMemo(
    () => (Bun===null)? data.reduce((acc, item) => acc + item.price, 0)  :Bun.price + Bun.price +  data.reduce((acc, item) => acc + item.price, 0)
  , [Bun,data]
    )

  return (
    <div className={Styles.count}>
      <p className="text text_type_digits-medium mr-3">{ PriceTotal }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
  
}
