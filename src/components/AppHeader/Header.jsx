import React from "react";
import stylesH from "./Header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AppHeader() {
  const auth = useSelector((store) => store.auth);

  const activeState = ({ isActive }) => {
    return {
      color: isActive ? "#F2F2F3" : "",
    };
  };

  return (
    <header className={stylesH.header}>
      <div className={stylesH.container}>
        <div className={stylesH.constructor}>
          <div className={`${stylesH.icon} ${stylesH.active}`}>
            <NavLink to="/" style={activeState}>
              <BurgerIcon type="primary" />
            </NavLink>
          </div>
          <p
            className={`${stylesH.title} ${stylesH.active} text text_type_main-default ml-2`}
          >
            <NavLink to="/" style={activeState}>
              Конструктор
            </NavLink>
          </p>
        </div>
        <div className={stylesH.order}>
          <div className={stylesH.icon}>
            <ListIcon type="primary" />
          </div>
          <p className={`${stylesH.title} text text_type_main-default ml-2`}>
            <NavLink to="/listOrder" style={activeState}>
              Лента заказов
            </NavLink>
          </p>
        </div>
      </div>
      <div className={stylesH.logo}>
        <NavLink to="/" style={activeState}>
          <Logo />
        </NavLink>
      </div>
      <div className={stylesH.personal}>
        <div className={stylesH.icon}>
         
        {!auth.isSetUser ? ( 
            <NavLink to="/login" style={activeState}>
              <ProfileIcon type="primary" />
          </NavLink>
          ) : (
            <NavLink to="/profile" style={activeState}>
              <ProfileIcon type="primary" />
          </NavLink>
          )}
        
        </div>
        <p className={`${stylesH.title} text text_type_main-default ml-2`}>
        
          {!auth.isSetUser ? ( 
            <NavLink to="/login" style={activeState}>
              Личный кабинет
          </NavLink>
          ) : (
            <NavLink to="/profile" style={activeState}>
              {auth.name}
          </NavLink>
          )}
        </p>
      </div>
    </header>
  );
}
