
import { Link, Navigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { useSelector, useDispatch } from "react-redux";

import {
  setEmail,
  setName,
  setPassword,
  userRegister, 
} from "../../services/actions/actions";
import { useNavigate} from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const onChangeName = (e) => {
    dispatch(setName(e.target.value));
  };

  const onChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const onChangePassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleClickRegister = (e) => {
    dispatch(
      userRegister({
        name: auth.name,
        password: auth.password,
        email: auth.email,
      })
    );
  };

  if (auth.isSetUser) {
    navigate("/");
  } 

  //name(pin):"Михаил"
  //password(pin):"897798979879" 123456
  //email(pin):"mixanik84@mail.ru" mzhesterov@yandex.ru

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ display: "flex", flexDirection: "column", padding: "100px" }}
      >
        <p className="text text_type_main-large">Регистрация</p>
        <div style={{ padding: "12px" }}>
          <Input
            onChange={onChangeName}
            value={auth.name}
            placeholder={"Имя"}
            name={"Name"}
            type={"text"}
          />
        </div>
        <div style={{ padding: "12px" }}>
          <EmailInput
            onChange={onChangeEmail}
            value={auth.email}
            name={"email"}
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
            onClick={handleClickRegister}
          >
            Зарегистрироваться
          </Button>
        </div>

        <p className="text text_type_main-default">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
