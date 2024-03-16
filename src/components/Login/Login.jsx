import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, singIn } from "../../services/actions/actions";

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
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClickLogin}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>

        <div className="mt-6 mb-6">
          <EmailInput
            onChange={onChangeEmail}
            value={auth.email}
            name={"email"}
            isIcon={false}
            extraClass="mb-2"
          />

          <PasswordInput
            onChange={onChangePassword}
            value={auth.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        {auth.error != null ? (
          <p className="text text_type_main-default">Ошибка: {auth.error}</p>
        ) : null}

        <Button type="primary" size="large" htmlType="submit">
          Войти
        </Button>

        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
          Вы - новый пользователь?
          <Link to="/register" className={`${styles.link} ml-2`}>
            Зарегестрироваться
          </Link>
        </p>
        <p className={`${styles.text} text text_type_main-default`}>
          Забыли пароль?
          <Link to="/forgot-password" className={`${styles.link} ml-2`}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </main>
  );
}
