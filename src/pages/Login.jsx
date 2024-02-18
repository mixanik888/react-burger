import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Not-found.module.css';


export default function LoginPage() {
  // let auth = useAuth();

  // const [form, setValue] = useState({ email: '', password: '' });

  // const onChange = e => {
  //   setValue({ ...form, [e.target.name]: e.target.value });
  // };

  // let login = useCallback(
  //   e => {
  //     e.preventDefault();
  //     auth.signIn(form);
  //   },
  //   [auth, form]
  // );

  // if (auth.user) {
  //   return (
  //     <Navigate
  //       to={'/'}
  //     />
  //   );
  // }

  
  const [value, setValue] = React.useState('bob@example.com')
  const onChange = e => {
    setValue(e.target.value)
  }
  const [value1, setValue1] = React.useState('bob@example.com')
  const onChange1= e => {
    setValue1(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          
            <EmailInput
              onChange={onChange}
              value={value}
              name={'email'}
              isIcon={false}
            />
                <PasswordInput
            onChange={onChange1}
            value={value}
            name={'password'}
            extraClass="mb-2"
          />
      
              </div>

        {/*<form className={styles.form}>

          {/* <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
          <PasswordInput
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={onChange}
          />
          <Button onClick={login} primary={true}>
            Log in
          </Button> 
        </form>*/}
      </div>
    </div>
  );
}