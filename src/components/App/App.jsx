import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/Header";
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
import HomeBurger from "../../pages/Home";
import NotFound404 from "../../pages/Not-found";
import Login from "../../pages/Login";

import { Routes, Route } from 'react-router-dom';

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
          <Routes>
              <Route path="/" element={<HomeBurger
                handleElementClick={handleElementClick}
                openIngredientDetailsClick={openIngredientDetailsClick}
                handleOrderToBayClick={handleOrderToBayClick}
              />} /> 
              <Route path="/Login" element={<Login  />} /> 
              <Route path="*" element={<NotFound404 />} />
          </Routes>

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
