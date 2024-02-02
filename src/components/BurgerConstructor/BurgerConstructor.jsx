import React from "react";
import styles from './BurgerConstructor.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'
import { ingredientType } from "../utils/types";


  return (
    <div className={styles.container}>
        <div className={styles.top}>
            {data.map((element, index) => {
              return element.type === 'bun' &&
                 <ConstructorElement
                    type="top"
                    isLocked={true}
                    key={element._id}
                    text={`${element.name} (верх)`}
                    price={element.price}
                    thumbnail={element.image}
                  />
            
            })}
        </div>
        <div className={styles.scroll}>
          {data.map((element, index) => {
            return element.type !== 'bun' &&
              <div>
                <DragIcon type="primary" className={styles.drag} />
                <ConstructorElement
                  style={{ maxHeight: 80 }}
                  text={element.name}
                  key={element._id}
                  price={element.price}
                  thumbnail={element.image}
                  />
              </div>
          })}
        </div>
        <div className={styles.bottom}>
        {data.map((element, index) => {
          return element.type === 'bun' &&
               <ConstructorElement
                type="bottom"
                isLocked={true}
                key={element._id}
                text={`${element.name} (низ)`}
                price={element.price}
                thumbnail={element.image}
              />
        })}
        </div>
    </div>)

}

BurgerConstructor.propTypes ={
  data: PropTypes.arrayOf(ingredientType).isRequired
}