import React, { useMemo } from "react";
import styles from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

export default function Ingredient({
  element,
  openIngredientDetailsClick,
  handleElementClick,
}) {
  const { bun, ingredients } = useSelector((store) => store.burger);

  const countValueItem = useMemo(() => {
    return ingredients.filter((item) => item._id === element._id).length;
  }, [ingredients, element._id]);

  const countValueBun = useMemo(() => {
    if (bun !== null && bun._id === element._id) {
      return 2;
    }
  }, [bun, element._id]);

  const count = element.type !== "bun" ? countValueItem : countValueBun;

  const [, drag] = useDrag(() => ({
    type: "ingredient",
    item: {
      id: element._id,
      element,
      type: element.type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div key={element._id} className={styles.ingredient} ref={drag}>
      {count > 0 && (
        <div className={styles.counter}>
          <Counter id={element._id} count={count} size="default" />
        </div>
      )}
      <img
        className={styles.image}
        id={element._id}
        src={element.image}
        alt={element.name}
        onClick={(e) => openIngredientDetailsClick(e, element)}
      />
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${styles.name} text text_type_main-default`}
        onClick={handleElementClick}
        id={element._id}
      >
        {element.name}
      </p>
    </div>
  );
}

Ingredient.propTypes = {
  element: ingredientType,
  openIngredientDetailsClick: PropTypes.func.isRequired,
  handleElementClick: PropTypes.func.isRequired,
};
