import React from 'react';
import styles from './Ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientType } from "../utils/types";

export default function Ingredient({element, OpenIngredientDetailsClick, handleElementClick}) {

      return (
        <div key={element._id} className={styles.ingredient}>
          {element.count > 0 &&
            <div className={styles.counter}>
              <Counter id={element._id} count={element.count} size="default" />
            </div>}
          <img className={styles.image}
            id={element._id}
            src={element.image}
            alt={element.name}
            onClick={(e) => OpenIngredientDetailsClick(e, element)} />
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2" >
              {element.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.name} text text_type_main-default`}
             onClick={handleElementClick} 
             id={element._id}
          >
            {element.name}
          </p>
        </div>
      )  

}

Ingredient.propTypes = {

  element: ingredientType,
  OpenIngredientDetailsClick: PropTypes.func.isRequired,
  handleElementClick: PropTypes.func.isRequired
}
