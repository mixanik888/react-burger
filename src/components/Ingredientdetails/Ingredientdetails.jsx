import React from "react";
import styles from "./Ingredientdetails.module.css";
//import { ingredientType } from "../utils/types";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const { actionIngredient } = useSelector((store) => store.acIngredient);

  return (
    <div className={styles.ingredient}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img
        className={styles.image}
        id={actionIngredient._id}
        src={actionIngredient.image_large}
        alt={actionIngredient.name}
      />
      <h3 className={`${styles.title} text text_type_main-medium`}>
        {actionIngredient.name}
      </h3>
      <div className={styles.caption}>
        <p className="text text_type_main-small">Калории,ккал</p>
        <p className="text text_type_main-small">Белки, г</p>
        <p className="text text_type_main-small">Жиры, г</p>
        <p className="text text_type_main-small">Углеводы, г</p>
        <p className="text text_type_main-small">{actionIngredient.calories}</p>
        <p className="text text_type_main-small">{actionIngredient.proteins}</p>
        <p className="text text_type_main-small">{actionIngredient.fat}</p>
        <p className="text text_type_main-small">
          {actionIngredient.carbohydrates}
        </p>
      </div>
    </div>
  );
}
