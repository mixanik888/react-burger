import React from "react";
import styles from "./ForgotPassword.module.css";

import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { setEmail, callEmailToForget } from "../../services/actions/actions";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // @ts-ignore
  const auth = useSelector((store) => store.auth);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setEmail(e.target.value));
  };

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    if (auth.email !== "") {
      // @ts-ignore
      dispatch(callEmailToForget({ email: auth.email }));
    }
  };

  React.useEffect(() => {
    if (auth.callEmailForgot) {
      navigate("/reset-password");
    }
  });

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClick}>
        <h3 className={`${styles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h3>

        <div className="mt-6 mb-6">
          <EmailInput
            placeholder={"Укажите e-mail"}
            onChange={onChangeEmail}
            value={auth.email}
            name={"email"}
            isIcon={false}
          />
        </div>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
        >
          Восстановить
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
