import styles from "../components/App/App.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";

export default function HomeBurger({
  handleElementClick,
  openIngredientDetailsClick,
  handleOrderToBayClick,
}) {
  return (
    <main className={styles.content}>
      <section className={styles.ingredients}>
        <BurgerIngredients handleElementClick={handleElementClick} />
      </section>
      <section className={styles.constructor}>
        <BurgerConstructor />
      </section>
    </main>
  );
}
