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
      dispatch(userProfile({ name: valueName, email: valueEmail }));
    } else {
      dispatch(userProfile({ name: valueName, email: valueEmail }));
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
    <main className={styles.section}>
      <form className={styles.section} onSubmit={handleClickCommit}>
        <div className="mt-6 mb-6">
          <Input
            onChange={onChange1}
            //onIconClick={onIconClickName}
            value={valueName}
            placeholder={"Имя"}
            type={"text"}
            icon="EditIcon"
            extraClass="mb-2"
          />

          <EmailInput
            onChange={onChange2}
            //onIconClick={onIconClickEmail}
            value={valueEmail}
            placeholder={"Логин"}
            name={"email"}
            icon="EditIcon"
            extraClass="mb-2"
          />

          <PasswordInput
            onChange={onChange3}
            value={valuePasswords}
            placeholder={"Пароль"}
            name={"password"}
            icon="EditIcon"
            extraClass="mb-2"
          />
        </div>

        {auth.name !== valueName ||
        auth.email !== valueEmail ||
        "" !== valuePasswords ? (
          <div className={styles.box}>
            <Button
              type="secondary"
              size="small"
              htmlType="submit"
              onClick={handleClickBack}
            >
              Отменить
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              Сохранить
            </Button>{" "}
          </div>
        ) : (
          ""
        )}
      </form>
    </main>
  );
}
