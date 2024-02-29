import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  singIn,
} from "../../services/actions/actions";


export default function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
     
    const onChangeEmail = (e) => {
      dispatch(setEmail(e.target.value));
    };
  
    const onChangePassword = (e) => {
      dispatch(setPassword(e.target.value));
    };

    const handleClickLogin = (e) => {
      dispatch(
        singIn({
          password: auth.password,
          email: auth.email,
        })
      );
    };
    
    return (
        <div className={styles.wrapper}>
          <div className={styles.container}
          style={{ display: "flex", flexDirection: "column", padding: "100px" }}
          >
        
            <p className="text text_type_main-large">Вход</p>
            <div style={{ padding: "12px" }}>
              <EmailInput
                onChange={onChangeEmail}
                value={auth.email}
                name={"email"}
                isIcon={false}
              />
            </div>
            <div style={{ padding: "12px" }}>
              <PasswordInput
                onChange={onChangePassword}
                value={auth.password}
                name={"password"}
                extraClass="mb-2"
              />{" "}
            </div>
            {auth.error != null ? (
          <p className="text text_type_main-default">Ошибка: {auth.error}</p>
        ) : null}
            <div style={{ padding: "12px 12px 40px 12px " }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={handleClickLogin}
              >
                Войти
              </Button>
            </div>
   
          <p className="text text_type_main-default">
            Вы - новый пользователь?{" "}
            <Link to="/register" className={styles.link}>
              Зарегестрироваться
            </Link>
          </p>
          <p className="text text_type_main-default">
            Забыли пароль?{" "}
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
          </div>
        </div> 
     )
   }