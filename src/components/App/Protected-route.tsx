
import { FC, ReactElement } from "react";
import { useSelector } from "../../services/store";
import { Navigate, useLocation } from "react-router";


interface TProtected {
  onlyUnAutch?: boolean
  component: ReactElement}

const Protected: FC<TProtected> = ({ onlyUnAutch = false, component }) => {
  //isAuthChecked проверяем что проверка токена пройзведена
  //onlyUnAutch - пользователь не авторизован
  //const isAuthChecked = useSelector ((store) => store.user.isAuthChecked);
  
  const user = useSelector((store) => store.auth.isSetUser);

  const load = useSelector((store) => store.auth.loading);

  let location = useLocation();

   if (load){
       return <h2>Загрузка...</h2>;
   }

  if (onlyUnAutch && user) {
    //Пользователь авторизован но роут для не авторизованого пользователя
    //Делаем редиректор на главную страницу или на тот ресурс, что записан в location

    const { from } = location.state || { from: { pathname: "/" } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAutch && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};

export const OnlyAutch1: FC<TProtected> =  ({ component }) => ( <Protected component={component} />);

export const OnlyUnAutch1: FC<TProtected> = ({ component }) => (
  <Protected onlyUnAutch={true} component={component} />
);
