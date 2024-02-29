import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../services/actions/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [valueName, setValueName] = React.useState(auth.name);
  const [isNotEditName, setIsNotEditName] = React.useState(false);

  const [valueEmail, setValueEmail] = React.useState(auth.email);
  const [isNotEditNameEmail, setIsNotEditNameEmail] = React.useState(false);

  const [valuePasswords, setValuePasswords] = React.useState("");

  const handleClickBack = (e) => {
    setValueName(auth.name);
    setValueEmail(auth.email);
    setValuePasswords("");
  };

  const handleClickCommit = (e) => {

    if ("" !== valuePasswords) {
      //dispatch(userProfile({ name : valueName, email : valueEmail, password : valuePasswords}))
      dispatch(userProfile({ name : valueName, email : valueEmail}))
    }
    else {
      dispatch(userProfile({ name : valueName, email : valueEmail}))
    }
    
  };

  const onChange1 = (e) => {
    setValueName(e.target.value);
  };
  const onChange2 = (e) => {
    setValueEmail(e.target.value);
  };
  const onChange3 = (e) => {
    setValuePasswords(e.target.value);
  };

  // const onIconClickName = (e) => {
  //   setIsNotEditName(!isNotEditName);
  // };

  // const onIconClickEmail = (e) => {
  //   setIsNotEditNameEmail(!isNotEditNameEmail);
  // };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ display: "flex", flexDirection: "column", padding: "100px" }}
      >
        <div style={{ padding: "12px" }}>
          <Input
            onChange={onChange1}
            //onIconClick={onIconClickName}
            value={valueName}
            placeholder={"Имя"}
            type={"text"}
            icon="EditIcon"
        
          />
        </div>
        <div style={{ padding: "12px" }}>
          <EmailInput
            onChange={onChange2}
            //onIconClick={onIconClickEmail}
            value={valueEmail}
            placeholder={"Логин"}
            name={"email"}
            icon="EditIcon"
          />
        </div>
        <div style={{ padding: "12px" }}>
          <PasswordInput
            onChange={onChange3}
            value={valuePasswords}
            placeholder={"Пароль"}
            name={"password"}
            icon="EditIcon"
          />
        </div>
       
          {auth.name !== valueName || auth.email !== valueEmail || "" !== valuePasswords ? ( <div style={{ padding: "12px 12px 40px 12px " }}>
             <Button
             type="primary"
             size="small"
             htmlType="submit"
             onClick={handleClickBack}
           >
             Отменить
           </Button>
            
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              onClick={handleClickCommit}
            >
              Сохранить
            </Button> </div>
          ) : (
            ""
          )}
      
      </div>
    </div>
  );
}
