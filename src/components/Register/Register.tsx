import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { useSelector, useDispatch } from "../../services/store";

import {
  setEmail,
  setName,
  setPassword,
  userRegister,
} from "../../services/actions/actions";

export default function Register() {
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    dispatch(setEmail(e.target.value));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    dispatch(setPassword(e.target.value));
  };

  const handleClickRegister = () => {

    dispatch( userRegister(JSON.stringify({
        name: auth.name,
        password: auth.password,
        email: auth.email,
      }))
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
            value= {(auth.name !== undefined ? auth.name:"")}
            placeholder={"Имя"}
            name={"Name"}
            type={"text"}
            extraClass="mb-2"
          />
        
        
          <EmailInput
            onChange={onChangeEmail}
            value={(auth.email !== undefined ? auth.email:"")}
            name={"email"}
            extraClass="mb-2"
          />
       
          <PasswordInput
            onChange={onChangePassword}
            value={(auth.password !== undefined ? auth.password:"")}
            name={"password"}
            extraClass="mb-2"
          />
        </div>

        {auth.error != null ? (
          <p className="text text_type_main-default">Ошибка: {auth.error.message}</p>
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
