import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/Header";
import IngredientDetails from "../Ingredientdetails/Ingredientdetails";

import Modal from "../Modal/Modal";

import { useDispatch, useSelector } from "../../services/store";
import { loadIngredient, setUser } from "../../services/actions/actions";

import HomeBurger from "../../pages/Home";
import NotFound404 from "../../pages/Not-found";
import Login from "../../pages/Login";

import { Routes, Route } from "react-router-dom";
import RegisterPage from "../../pages/Register";
import ForgotPasswordPage from "../../pages/Forgot-password";
import ResetPasswordPage from "../../pages/Reset-password";
import ProfilePage from "../../pages/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { OnlyAutch1, OnlyUnAutch1 } from "./Protected-route";

import { wsInit, wsInitUser } from "../../services/actions/middlewareActions";
import Feed from "../../pages/Feed";
import ListOrdersDetails from "../ListOrdersDetails/ListOrdersDetails";
import { ApiConfig } from "../../utils/burger-api";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const dispatch = useDispatch();
  const { loading, error, data1 } = useSelector((store) => store.data);

  React.useEffect(() => {

    dispatch(loadIngredient());
    dispatch(setUser());
    dispatch(wsInit(`${ApiConfig.baseURLWS}/all`));
    
    const accessToken = localStorage.getItem("accessToken");


    if (accessToken !== null && accessToken.startsWith("Bearer ")){
      const token = accessToken.replace("Bearer ", "");
      const URL = `${ApiConfig.baseURLWS}?token=${token}`;

      dispatch(wsInitUser(URL));

    } 

  }, [dispatch]);

  if (loading || data1.length === 0) {
    return <h2>Загрузка...</h2>;
  }

  if (!loading && error) {
    return <h2>error: {error}</h2>;
  }

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div>
      {
        <div className={styles.App}>
          <AppHeader />
          <Routes location={background || location}>
            <Route
              path="/"
              element={<HomeBurger />}
            />
            <Route path="/ingredients/:ingId" element={<IngredientDetails />} />
           
            <Route path="/login" element={<OnlyUnAutch1 component={<Login />} />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:id" element={<ListOrdersDetails />} />

            <Route path="/register" element={<OnlyUnAutch1 component={<RegisterPage />}/>} />
            <Route path="/forgot-password" element={<OnlyUnAutch1 component={<ForgotPasswordPage  />} />} />
            <Route path="/reset-password" element={<OnlyUnAutch1 component={<ResetPasswordPage  />} />} />
            <Route path="/profile" element={<OnlyAutch1 component={<ProfilePage />} />} />
            <Route path="/profile/orders" element={<OnlyAutch1 component={<ProfilePage />} />} />
            <Route path="/profile/orders/:id" element={<OnlyAutch1 component={<ListOrdersDetails />} />} />

            <Route path="*" element={<NotFound404 />} />
         
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:ingId"
                element={
                  <Modal onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <Modal onClose={closeModal}>
                    <ListOrdersDetails />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <Modal onClose={closeModal}>
                    <OnlyAutch1 component={<ListOrdersDetails />} />
                  </Modal>
                }
              />
            </Routes>
          

          )}
        </div>
      }
    </div>
  );
}
