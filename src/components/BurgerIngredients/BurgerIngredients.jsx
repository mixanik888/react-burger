import React, { useRef } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from '../Ingredient/Ingredient';
import PropTypes from 'prop-types';
//import { ingredientType } from "../utils/types";
import { useSelector } from 'react-redux';
//import { hasOnebuns } from '../services/selectors';

export default function BurgerIngredients ({ handleElementClick, OpenIngredientDetailsClick}) {
  const [current, setCurrent] = React.useState('BunTab');
  const data = useSelector(store => store.Data.data1.data);   

  const scollToBun    = useRef();
  const scollToSauce  = useRef();
  const scollToMain   = useRef();
  
  const nullRef   = useRef();
  
  const buns = React.useMemo (() => 
    data.filter(item => item.type === 'bun'), [data]);

  const sauces = React.useMemo (() => 
    data.filter(item => item.type === 'sauce'), [data]);
  
  const mains = React.useMemo (() => 
   data.filter(item => item.type === 'main'), [data]);

  //function executeScroll(e) {
  const executeScroll = (e) =>  {
    
    if (e === "BunTab") {
      setCurrent(e);
      scollToBun.current.scrollIntoView();
    }

    if (e === "SauceTab") {
      setCurrent(e);
      scollToSauce.current.scrollIntoView();
    }

    if (e === "MainTab") {
      setCurrent(e);
      scollToMain.current.scrollIntoView();
    }
    
  }  
 
  const OnScroll = (e) =>  {

    const rectBun     = scollToBun.current.getBoundingClientRect();
    const rectSauce   = scollToSauce.current.getBoundingClientRect();
    const rectMain    = scollToMain.current.getBoundingClientRect();
   
    const rectnullRef    = nullRef.current.getBoundingClientRect();
   
    if ( rectnullRef.top < rectBun.top  && rectnullRef.top < rectSauce.top && rectnullRef.top < rectMain.top)  { setCurrent("BunTab")}
    else if (rectnullRef.top > rectBun.top  && rectnullRef.top < rectSauce.top && rectnullRef.top < rectMain.top) { setCurrent("SauceTab")}
    else if (rectnullRef.top > rectBun.top  && rectnullRef.top > rectSauce.top && rectnullRef.top < rectMain.top) { setCurrent("MainTab")}

  }


  
  return (
    data && <>
    <p className={`${styles.title} text text_type_main-large mt-10 mb-9`} ref={nullRef}>
      Соберите бургер
    </p>
     <div className={styles.containerTab} name = "IngredientTab">
    <Tab value="BunTab" active={current === 'BunTab'} onClick={ executeScroll}>
      Булки
    </Tab>
    <Tab value="SauceTab" active={current === 'SauceTab'} onClick={ executeScroll}>
      Соусы
    </Tab>
    <Tab value="MainTab" active={current === 'MainTab'} onClick={ executeScroll}>
      Начинки
    </Tab>
  
  </div>      
    <div className={styles.scroll} onScroll={OnScroll}>
        <p className={`${styles.title} text text_type_main-medium mt-10`} ref={scollToBun}>
          Булки
        </p>
          <div className={styles.buns}>
            {buns.map((element) => {return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>})}
          </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`} ref={scollToSauce}>
          Соусы
        </p>
          <div className={styles.sauces}>
            {sauces.map((element) => {return  <Ingredient
              key={element._id}
              element={element}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick}
              handleElementClick={handleElementClick}/>})}
          </div>
        <p className={`${styles.title} text text_type_main-medium mt-10`} ref={scollToMain}>
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
  handleElementClick: PropTypes.func.isRequired,
  OpenIngredientDetailsClick: PropTypes.func.isRequired
}
