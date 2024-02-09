import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/Header";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../Ingredientdetails/Ingredientdetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import { useDispatch } from "react-redux";
import { addOrder, loadIngredient } from "../../services/actions/actions";
import { useSelector } from "react-redux";
import {
  addConstructorItem,
  addConstructorBun,
  clearConstructor,
} from "../../services/reducers/constructorReducer";
import { setActionIngredient } from "../../services/reducers/actionIngredientReducer";

export default function App() {
  const dispatch = useDispatch();

  const { loading, error, data1 } = useSelector((store) => store.data);
  const { actionIngredient } = useSelector((store) => store.acIngredient);
  const { bun, ingredients } = useSelector((store) => store.burger);

  const [isOpen, setOpen] = React.useState(false);

  const ingredientsList = [];

  React.useEffect(() => {
    dispatch(loadIngredient());
  }, [dispatch]);

  if (loading || data1.length === 0) {
    return <h2>Загрузка...</h2>;
  }

  if (!loading && error) {
    return <h2>error: {error}</h2>;
  }

  const handleElementClick = (e) => {
    const element = data1.data.find((item) => item._id === e.target.id);

    if (element.type !== "bun") {
      dispatch(addConstructorItem(element));
    } else {
      dispatch(addConstructorBun(element));
    }
  };

  const closeModal = () => {
    setOpen(!isOpen);
  };

  const handleOrderToBayClick = () => {
    if (bun !== null) {
     
      ingredientsList.push(bun._id);

      for (const item of ingredients) {
        ingredientsList.push(item._id);
      }

      ingredientsList.push(bun._id);

      dispatch(addOrder(ingredientsList));
      dispatch(setActionIngredient(null));
      dispatch(clearConstructor());
      setOpen(!isOpen);
    }
  };

  const openIngredientDetailsClick = (e, item) => {
    dispatch(setActionIngredient(item));
    setOpen(!isOpen);
  };

  return (
    <div>
      {
        <div className={styles.App}>
          <AppHeader />
          <main className={styles.content}>
            <section className={styles.ingredients}>
              <BurgerIngredients
                handleElementClick={handleElementClick}
                openIngredientDetailsClick={openIngredientDetailsClick}
              />
            </section>
            <section className={styles.constructor}>
              <BurgerConstructor
                handleOrderToBayClick={handleOrderToBayClick}
              />
            </section>
          </main>

          {isOpen ? (
            <Modal onClose={closeModal}>
              {actionIngredient !== null ? (
                <IngredientDetails />
              ) : (
                <OrderDetails />
              )}
            </Modal>
          ) : null}
        </div>
      }
    </div>
  );
}
