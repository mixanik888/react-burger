import React from "react";
import styles from "./ProfileOrders.module.css";
import {  useDispatch, useSelector } from "../../services/store";
import { TOrderKey } from "../../utils/types";
import { ListOrdersCart } from "../ListOrdersCart/ListOrdersCart";
import { ApiConfig } from "../../utils/burger-api";
import { onCloseUser, wsInitUser } from "../../services/actions/middlewareActions";


export default function ProfileOrders() {
  const dispatch = useDispatch();
  React.useEffect(() => {

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null && accessToken.startsWith("Bearer ")){
      const token = accessToken.replace("Bearer ", "");
      const URL = `${ApiConfig.baseURLWS}?token=${token}`;

      dispatch(wsInitUser(URL));

    } 

    return() => {
      dispatch(onCloseUser());
    }
    

  }, [dispatch]);

  const wsOrders = useSelector((store) => store.wsOderUser);

  if (wsOrders.status !== 0 || wsOrders.orders.length === 0) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <main className={styles.section}>
      <form className={styles.section}>
       
      <div className={styles.scroll}>
          {wsOrders.orders.map((element: TOrderKey, index: number) => {
            return <ListOrdersCart  key={element._id}  actionOrder={element} isProfileUser={true}/>
          })}
          </div>
      </form>
    </main>
  );
}
