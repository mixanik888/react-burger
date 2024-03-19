import React, { useMemo, FC } from "react";
import styles from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  addConstructorItem,
  addConstructorBun,
} from "../../services/reducers/constructorReducer";
import { TElement } from "../../utils/types";

interface DragItem {
  element: TElement
  key: string
}

const Ingredient: FC<DragItem> = ({element}) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { bun, ingredients } = useSelector((store) => store.burger);
    // @ts-ignore
    const data = useSelector((store) => store.data.data1.data);

  const location = useLocation();
  const ingId = element['_id'];

  const countValueItem = useMemo(() => {
    return ingredients.filter((item:TElement) => item._id === element._id).length;
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

  const handleElementClick = (e:  React.MouseEvent<HTMLDivElement>) => {
    const element = data.find((item:TElement) => item._id === e.currentTarget.id);

    if (element.type !== "bun") {
       // @ts-ignore
      dispatch(addConstructorItem(element));
    } else {
       // @ts-ignore
      dispatch(addConstructorBun(element));
    }
  };


  return (
    <div key={element._id} className={styles.ingredient} ref={drag}>
      {count > 0 && (
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
      <Link
      key={ingId}
      to={`/ingredients/${ingId}`}
      state={{ background: location }}
      className={styles.link}
      >
      <img
        className={styles.image}
        id={element._id}
        src={element.image}
        alt={element.name}
      />
      </Link>
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

export default Ingredient;