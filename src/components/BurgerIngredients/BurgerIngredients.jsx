import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from '../Ingredient/Ingredient';
import PropTypes from 'prop-types';
import { ingredientType } from "../utils/types";

export default function BurgerIngredients ({data, handleElementClick, OpenIngredientDetailsClick}) {
  const [current, setCurrent] = React.useState('one');

  return (
    data && <>
    <p className={`${styles.title} text text_type_main-large mt-10 mb-9`} >
      Соберите бургер
    </p>
     <div className={styles.containerTab}>
    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
      Булки
    </Tab>
    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
      Соусы
    </Tab>
    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
      Начинки
    </Tab>
  </div>      
    <div className={styles.scroll}>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Булки
        </p>
          <div className={styles.buns}>
            {data.map((element) => {
              if (element.type === 'bun') {
                return  <Ingredient
                key={element._id}
                element={element}
                OpenIngredientDetailsClick={OpenIngredientDetailsClick}
                handleElementClick={handleElementClick}/>
              } else {return []}
              }
            )}
          </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Соусы
        </p>
        <div className={styles.sauces}>
        {data.map((element) => {
            if (element.type === 'sauce') {
              return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>
            } else {return []}
          }
        )}
      </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`}>
          Начинки
        </p>
        <div className={styles.mains}>
        {data.map((element) => {
            if (element.type === 'main') {
              return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>
            } else {return []}
          }
        )}
      </div>
      
      </div>
   

  </>)
      
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  handleElementClick: PropTypes.func.isRequired,
  OpenIngredientDetailsClick: PropTypes.func.isRequired
}
