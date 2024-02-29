import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.css";

import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  callEmailToForget,
} from "../../services/actions/actions";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
     
    const onChangeEmail = (e) => {
      dispatch(setEmail(e.target.value));
    };
   
    const handleClick = (e) => {
      if (auth.email !== "") {
      dispatch(callEmailToForget({"email":auth.email}));}
    };
  
    React.useEffect(()=> {
      if (auth.callEmailForgot) {
        navigate("/reset-password");
      } 

    },);

    return (
        <div className={styles.wrapper}>
          <div className={styles.container}
          style={{ display: "flex", flexDirection: "column", padding: "100px" }}
          >
            <p className="text text_type_main-large">Восстановление пароля</p>
            <div style={{ padding: "12px" }}>
              <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={onChangeEmail}
                value={auth.email}
                name={"email"}
                isIcon={false}
              />
            </div>
            <div style={{ padding: "12px 12px 40px 12px " }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={handleClick}
              >
                Восстановить
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