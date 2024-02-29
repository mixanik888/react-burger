import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input  
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Reset-password.module.css";
import { useSelector, useDispatch } from "react-redux";
import {

  setPassword,
  setToken,
  callResetPassword,
} from "../../services/actions/actions";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
   
   const onChangePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const onChangeToken = (e) => {
    dispatch(setToken(e.target.value));
  };

    const handleClick = (e) => {

      if (auth.password !== "") {
        dispatch(callResetPassword({"password":auth.password, "token": auth.token}));}

    };

    React.useEffect(()=> {
      if (!auth.callEmailForgot) {
        navigate("/login");
      } 

    },);
  
  
    return (
        <div className={styles.wrapper}>
          <div className={styles.container}
          style={{ display: "flex", flexDirection: "column", padding: "100px" }}
          >
            <p className="text text_type_main-large">Регистрация</p>
            <div style={{ padding: "12px" }}>
              <PasswordInput
                onChange={onChangePassword}
                value={auth.password}
                placeholder={'Введите новый пароль'}
                name={"password"}
                extraClass="mb-2"
              />{" "}
            </div>
            <div style={{ padding: "12px" }}>
              <Input
                onChange={onChangeToken}
                value={auth.token}
                placeholder={'Введите код из письма'}
                name={"Name"}
                type={"text"}
               
              />
            </div>
            <div style={{ padding: "12px 12px 40px 12px " }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={handleClick}
              >
                Сохранить
              </Button>
            </div>
   
      
          <p className="text text_type_main-default">
            Вспомнили пароль?{" "}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
          </div>
        </div> 
     )
   }