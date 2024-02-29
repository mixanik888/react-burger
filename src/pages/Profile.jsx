import Profile from "../components/Profile/Profile";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";

import styles from "../components/Profile/Profile.module.css";
import ProfileOrders from "../components/ProfileOrders/ProfileOrders";
import { useDispatch } from "react-redux";
import { signOut } from "../services/actions/actions";

export default function ProfilePage() {
  const dispatch = useDispatch();
  let location = useLocation();

  const activeState = ({ isActive }) => {
    return {
      color: isActive ? "#F2F2F3" : "",
    };
  };
  
  const onClick = () => {
    dispatch(signOut());
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <p
              className={`${styles.title} ${styles.active} text text_type_main-medium`}
            >
              <NavLink to="/profile" end style={activeState}>
                Профиль
              </NavLink>
            </p>
          </li>
          <li className={styles.li}>
            <p
              className={`${styles.title} ${styles.active} text text_type_main-medium`}
            >
              <NavLink to="/profile/orders" end style={activeState}>
                История
              </NavLink>
            </p>
          </li>
          <li className={styles.li}>
            <p
              className={`${styles.title} ${styles.active} text text_type_main-medium`}
            >
              <NavLink to="/login" style={activeState} onClick={onClick}>
                Выход
              </NavLink>
            </p>
          </li>
        </ul>
      </section>
      <section className={styles.container}>
 
           { (location.pathname === "/profile") && <Profile />}
           { (location.pathname === "/profile/orders") && <ProfileOrders />}
      
      </section>
    </main>
  );
}
