import React from "react";
import stylesH from "./Header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className={stylesH.header}>
      <div className={stylesH.container}>
        <div className={stylesH.constructor}>
          <div className={`${stylesH.icon} ${stylesH.active}`}>
            <BurgerIcon type="primary" />
          </div>
          <p
            className={`${stylesH.title} ${stylesH.active} text text_type_main-default ml-2`}
          >
            Конструктор
          </p>
        </div>
        <div className={stylesH.order}>
          <div className={stylesH.icon}>
            <ListIcon type="primary" />
          </div>
          <p className={`${stylesH.title} text text_type_main-default ml-2`}>
            Лента заказов
          </p>
        </div>
      </div>
      <div className={stylesH.logo}>
        <Logo />
      </div>
      <div className={stylesH.personal}>
        <div className={stylesH.icon}>
          <ProfileIcon type="primary" />
        </div>
        <p className={`${stylesH.title} text text_type_main-default ml-2`}>
          Личный кабинет
        </p>
      </div>
    </header>
  );
}
