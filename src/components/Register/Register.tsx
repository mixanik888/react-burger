import { Link, useNavigate } from "react-router-dom";
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

export default function Register() {
  const dispatch = useDispatch();
  // @ts-ignore
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setName(e.target.value));
  };

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setEmail(e.target.value));
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setPassword(e.target.value));
  };

  const handleClickRegister = () => {
    // @ts-ignore
    dispatch( userRegister({
        name: auth.name,
        password: auth.password,
        email: auth.email,
      })
    );
  };

  if (auth.isSetUser) {
    navigate("/");
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClickRegister}>
        <h3 className={`${styles.title} text text_type_main-medium`}>
          Регистрация
        </h3>

        <div className="mt-6 mb-6">
          <Input
            onChange={onChangeName}
            value={auth.name}
            placeholder={"Имя"}
            name={"Name"}
            type={"text"}
            extraClass="mb-2"
          />
        
        
          <EmailInput
            onChange={onChangeEmail}
            value={auth.email}
            name={"email"}
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
          Зарегистрироваться
        </Button>

        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>
          Уже зарегистрированы?
          <Link to="/login" className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}
