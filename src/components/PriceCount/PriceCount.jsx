import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './PriceCount.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../utils/types";


export default function PriceCount({data}) {
  
  data.reduce((acc, item) => acc + item.price, 0);
  
  return (
    <div className={Styles.count}>
      <p className="text text_type_digits-medium mr-3">{ data.reduce((acc, item) => acc + item.price, 0) }</p>
      <CurrencyIcon type="primary" />
    </div>
  )
  
}

PriceCount.propTypes ={
  data: PropTypes.arrayOf(ingredientType).isRequired
}