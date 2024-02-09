import { useCallback } from "react";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteConstructorItem,
  addConstructorBun,
  addConstructorItem,
  spliceConstructorItem,
} from "../../services/reducers/constructorReducer";
import { useDrop } from "react-dnd";
import { BurgerElement } from "../BurgerElement/BurgerElement";
import PriceCount from "../PriceCount/PriceCount";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ handleOrderToBayClick }) {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => addConstructorElement(item.element),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const addConstructorElement = (element) => {
    if (element.type !== "bun") {
      dispatch(addConstructorItem(element));
    } else {
      dispatch(addConstructorBun(element));
    }
  };

  const deleteConstructorElement = (e) => {
    dispatch(deleteConstructorItem(e));
  };

  const moveElement = useCallback(
    (dragIndex, hoverIndex) => {
      console.log(dragIndex, hoverIndex);
      dispatch(
        spliceConstructorItem({
          dragIndex: { dragIndex },
          hoverIndex: { hoverIndex },
        })
      );
    },
    [dispatch]
  );

  return (
    <div className={styles.container} ref={drop}>
      <div className={styles.top}>
        {bun === null ? (
          <div className={styles.boxTop}>
            {isActive ? "Release to drop" : "Drag a box here"}
          </div>
        ) : (
          <div>
            <ConstructorElement
              type="top"
              isLocked={true}
              key={bun._Id}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={styles.scroll}>
        {ingredients.length === 0 ? (
          <div className={styles.box}></div>
        ) : (
          ingredients.map((element, index) => {
            return (
              element.type !== "bun" && (
                <div key={element.key}>
                  <BurgerElement
                    key={element.key}
                    index={index}
                    id={element.key}
                    element={element}
                    moveElement={moveElement}
                    deleteConstructorElement={deleteConstructorElement}
                  />
                </div>
              )
            );
          })
        )}
      </div>

      <div className={styles.bottom}>
        {bun === null ? (
          <div className={styles.boxBottom}>
            {isActive ? "Release to drop" : "Drag a box here"}
          </div>
        ) : (
          <div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              key={bun._id + 1}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={styles.count}>
        <PriceCount />
        <div className={styles.button}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleOrderToBayClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  handleOrderToBayClick: PropTypes.func.isRequired
};
