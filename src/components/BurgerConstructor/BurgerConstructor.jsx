import { useCallback,useState } from "react";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConstructorItem,
  addConstructorBun,
  addConstructorItem,
  spliceConstructorItem,
  clearConstructor,
} from "../../services/reducers/constructorReducer";
import { addOrder } from "../../services/actions/actions";

import { useDrop } from "react-dnd";
import { BurgerElement } from "../BurgerElement/BurgerElement";
import PriceCount from "../PriceCount/PriceCount";


import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useNavigate} from "react-router-dom";


export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger);
  const [isOpen, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.isSetUser);
  const navigate = useNavigate();

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
      //console.log(dragIndex, hoverIndex);
      dispatch(
        spliceConstructorItem({
          dragIndex: { dragIndex },
          hoverIndex: { hoverIndex },
        })
      );
    },
    [dispatch]
  );

  const ingredientsList = [];

  const handleOrderToBayClick = () => {

     if  (user === false) {
   
       navigate("/login");

       } 
     else {
      if (bun !== null) {
       ingredientsList.push(bun._id);

       for (const item of ingredients) {
         ingredientsList.push(item._id);
       }

       ingredientsList.push(bun._id);

       dispatch(addOrder(ingredientsList));
       dispatch(clearConstructor());
       setOpen(!isOpen);
     }
    }
   };

   const closeModal = () => {
    setOpen(!isOpen);
  };

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

       {isOpen ? (
            <Modal onClose={closeModal}>
               <OrderDetails />
            </Modal>
          ) : null}  
    </div>
  );
}

