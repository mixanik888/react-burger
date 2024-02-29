import React from "react";
import styles from "./Ingredientdetails.module.css";
//import { ingredientType } from "../utils/types";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export default function IngredientDetails() {
  let { ingId } = useParams();

  const data = useSelector((store) => store.data.data1.data);

  const actionIngredient = React.useMemo(
    () => data.filter((item) => item._id === ingId),
    [data]
  );

  if (actionIngredient.length === 0) return null;

  return (
    <div className={styles.ingredient}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img
        className={styles.image}
        id={actionIngredient[0]._id}
        src={actionIngredient[0].image_large}
        alt={actionIngredient[0].name}
      />
      <h3 className={`${styles.title} text text_type_main-medium`}>
        {actionIngredient.name}
      </h3>
      <div className={styles.caption}>
        <p className="text text_type_main-small">Калории,ккал</p>
        <p className="text text_type_main-small">Белки, г</p>
        <p className="text text_type_main-small">Жиры, г</p>
        <p className="text text_type_main-small">Углеводы, г</p>
        <p className="text text_type_main-small">
          {actionIngredient[0].calories}
        </p>
        <p className="text text_type_main-small">
          {actionIngredient[0].proteins}
        </p>
        <p className="text text_type_main-small">
          {actionIngredient[0].fat}</p>
        <p className="text text_type_main-small">
          {actionIngredient[0].carbohydrates}
        </p>
      </div>
    </div>
  );
}
