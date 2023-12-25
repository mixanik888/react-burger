import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from '../Ingredient/Ingredient';
import PropTypes from 'prop-types';
import { ingredientType } from "../utils/types";

export default function BurgerIngredients ({data, handleElementClick, OpenIngredientDetailsClick}) {
  const [current, setCurrent] = React.useState('BunTab');

  const buns = React.useMemo (() => 
    data.filter(item => item.type === 'bun'), [data]);

  const sauces = React.useMemo (() => 
    data.filter(item => item.type === 'sauce'), [data]);
  
  const mains = React.useMemo (() => 
    data.filter(item => item.type === 'main'), [data]);

  return (
    data && <>
    <p className={`${styles.title} text text_type_main-large mt-10 mb-9`} >
      Соберите бургер
    </p>
     <div className={styles.containerTab}>
    <Tab value="BunTab" active={current === 'BunTab'} onClick={setCurrent}>
      Булки
    </Tab>
    <Tab value="SauceTab" active={current === 'SauceTab'} onClick={setCurrent}>
      Соусы
    </Tab>
    <Tab value="MainTab" active={current === 'MainTab'} onClick={setCurrent}>
      Начинки
    </Tab>
  </div>      
    <div className={styles.scroll}>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Булки
        </p>
          <div className={styles.buns}>
            {buns.map((element) => {return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>})}
          </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Соусы
        </p>
          <div className={styles.sauces}>
            {sauces.map((element) => {return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>})}
          </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Начинки
        </p>
        <div className={styles.mains}>
            {mains.map((element) => {return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>})}
        </div>
      
      </div>
   

  </>)
      
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  handleElementClick: PropTypes.func.isRequired,
  OpenIngredientDetailsClick: PropTypes.func.isRequired
}
