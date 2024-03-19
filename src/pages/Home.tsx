import styles from "../components/App/App.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";


export default function HomeBurger() {
  return (
    <main className={styles.content}>
      <section className={styles.ingredients}>
        <BurgerIngredients />
      </section>
      <section className={styles.constructor1}>
        <BurgerConstructor />
      </section>
    </main>
  );
}
