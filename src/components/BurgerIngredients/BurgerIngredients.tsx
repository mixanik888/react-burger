import React, { useRef } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import { useSelector } from "../../services/store";
import { TElement } from "../../utils/types";

export default function BurgerIngredients() {

  const [current, setCurrent] = React.useState("BunTab");
  const data = useSelector((store) => store.data.data1);

  const scrollToBun = useRef<HTMLDivElement>(null);
  const scrollToSauce = useRef<HTMLDivElement>(null);
  const scrollToMain = useRef<HTMLDivElement>(null);
  const scrollNullRef = useRef<HTMLDivElement>(null);

  const buns = React.useMemo(
    () => data.filter((item:TElement) => item.type === "bun"),
    [data]
  );

  const sauces = React.useMemo(
    () => data.filter((item:TElement) => item.type === "sauce"),
    [data]
  );

  const mains = React.useMemo(
    () => data.filter((item:TElement) => item.type === "main"),
    [data]
  );

   const executeScroll = (e: string) => {
     if (e === "BunTab") {
      setCurrent(e);
       scrollToBun.current!.scrollIntoView();
    }

     if (e === "SauceTab") {
       setCurrent(e);
      scrollToSauce.current!.scrollIntoView();
     }

     if (e === "MainTab") {
       setCurrent(e);
      scrollToMain.current!.scrollIntoView();
     }
   };

  const OnScroll = () => {
    const rectBun     = scrollToBun.current!.getBoundingClientRect();
    const rectSauce   = scrollToSauce.current!.getBoundingClientRect();
    const rectMain    = scrollToMain.current!.getBoundingClientRect();
    const nullRef     = scrollNullRef.current!.getBoundingClientRect();

    if (
      nullRef.top < rectBun.top &&
      nullRef.top < rectSauce.top &&
      nullRef.top < rectMain.top
    ) {
      setCurrent("BunTab");
    } else if (
      nullRef.top > rectBun.top &&
      nullRef.top < rectSauce.top &&
      nullRef.top < rectMain.top
    ) {
      setCurrent("SauceTab");
    } else if (
      nullRef.top > rectBun.top &&
      nullRef.top > rectSauce.top &&
      nullRef.top < rectMain.top
    ) {
      setCurrent("MainTab");
    }
  };

  return (
    data && (
      <>
        <p
          className={`${styles.title} text text_type_main-large mt-10 mb-9`}
          ref={scrollNullRef}
        >
          Соберите бургер
        </p>
        <div className={styles.containerTab}>
          <Tab
            value="BunTab"
            active={current === "BunTab"}
            onClick={executeScroll}
          >
            Булки
          </Tab>
          <Tab
            value="SauceTab"
            active={current === "SauceTab"}
            onClick={executeScroll}
          >
            Соусы
          </Tab>
          <Tab
            value="MainTab"
            active={current === "MainTab"}
            onClick={executeScroll}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll} onScroll={OnScroll}>
          <p
            className={`${styles.title} text text_type_main-medium mt-10`}
            ref={scrollToBun}
          >
            Булки
          </p>
          <div className={styles.buns}>
            {buns.map((element:TElement) => {
              return (
                <Ingredient
                  key={element._id}
                  element={element}
                />
              );
            })}
          </div>
          <p
            className={`${styles.title} text text_type_main-medium mt-10`}
            ref={scrollToSauce}
          >
            Соусы
          </p>
          <div className={styles.sauces}>
            {sauces.map((element:TElement) => {
              return (
                <Ingredient
                  key={element._id}
                  element={element}
                />
              );
            })}
          </div>
          <p
            className={`${styles.title} text text_type_main-medium mt-10`}
            ref={scrollToMain}
          >
            Начинки
          </p>
          <div className={styles.mains}>
            {mains.map((element:TElement) => {
              return (
                <Ingredient
                  key={element._id}
                  element={element}
                />
              );
            })}
          </div>
        </div>
      </>
    )
  );
}

