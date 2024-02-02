import React from "react";
import styles from "./Ingredientdetali.module.css";
//import { ingredientType } from "../utils/types";
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
  
  const {ActionIngredient} = useSelector(store => store.AcIngredient); 
  
  return (
    <div className={styles.ingredient}>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={styles.image}
        id={ActionIngredient._id}
        src={ActionIngredient.image_large}
        alt={ActionIngredient.name}
      />
      <h3 className={`${styles.title} text text_type_main-medium`}>{ActionIngredient.name}</h3>
      <div className={styles.caption}>
        <p className="text text_type_main-small">
          Калории,ккал
        </p>
        <p className="text text_type_main-small">
          Белки, г
        </p>
        <p className="text text_type_main-small">
          Жиры, г
        </p>
        <p className="text text_type_main-small">
          Углеводы, г
        </p>
        <p className="text text_type_main-small">
          {ActionIngredient.calories}
        </p>
        <p className="text text_type_main-small">
          {ActionIngredient.proteins}
        </p>
        <p className="text text_type_main-small">
          {ActionIngredient.fat}
        </p>
        <p className="text text_type_main-small">
          {ActionIngredient.carbohydrates}
        </p>
      </div>
    </div>
  )
}

