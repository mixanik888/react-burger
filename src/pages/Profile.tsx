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
  
  const activeState = ({ isActive }: { isActive: boolean }) => {
    return {
      color: isActive ? "#F2F2F3" : "",
    };
  };

  const onClick = () => {
    // @ts-ignore
    dispatch(signOut());
  };

  return (
    <main className={styles.main}>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink 
        to="/profile" end 
        className={styles.tab}
        style={activeState} 
        >
          <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
        </NavLink>

        <NavLink 
        to="/profile/orders" end 
        className={styles.tab}
        style={activeState} 
        >
          <h3 className='text text_type_main-medium mb-8'>История заказов</h3>
        </NavLink>

        <NavLink 
        to="/login" 
        className={styles.tab}
        style={activeState}
        >
         <h3 onClick={onClick} className='text text_type_main-medium mb-4'>Выход</h3> 
         
        </NavLink>
      </nav>

      <section className={styles.section}>
        {location.pathname === "/profile" && <Profile />}
        {location.pathname === "/profile/orders" && <ProfileOrders />}
      </section>
    </main>
  );
}
