import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
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
  const auth = useSelector((store:any) => store.auth);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setPassword(e.target.value));
  };

  const onChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setToken(e.target.value));
  };

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    if (auth.password !== "") {
      dispatch(
        // @ts-ignore
        callResetPassword({ password: auth.password, token: auth.token })
      );
    }
  };

  React.useEffect(() => {
    if (!auth.callEmailForgot) {
      navigate("/login");
    }
  });

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClick}>
        <h3 className={`${styles.title} text text_type_main-medium`}>
          Регистрация
        </h3>

        <div className="mt-6 mb-6">
          <PasswordInput
            onChange={onChangePassword}
            value={auth.password}
            placeholder={"Введите новый пароль"}
            name={"password"}
            extraClass="mb-2"
          />
          <Input
            onChange={onChangeToken}
            value={auth.token}
            placeholder={"Введите код из письма"}
            name={"Name"}
            type={"text"}
          />
        </div>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
        >
          Сохранить
        </Button>

        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
          Вспомнили пароль?
          <Link to="/login" className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}
