import React from "react";
import styles from './BurgerConstructor.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteConstructorItem, addConstructorBun, addConstructorItem } from '../services/reducers/ConstructorReducer';
import { useDrop } from "react-dnd";


export default function BurgerConstructor() {
  
  const dispatch = useDispatch();
  const dataItem = useSelector(store => store.Burger.Ingredients);
  const Bun = useSelector(store => store.Burger.bun);

   const deleteElement = (e) => {
     dispatch (deleteConstructorItem(e));
   }

   const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => (addConstructorElement(item.element)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver

  const addConstructorElement = (element) => {
    if (element.type !== 'bun') {
      dispatch (addConstructorItem(element));
    } 
    else {
      dispatch (addConstructorBun(element));
    }
  }

  return (
    
    <div className={styles.container} ref={drop}>
     
        <div className={styles.top}>
         { (Bun === null)? 
         <div className={styles.boxTop}>{isActive ? 'Release to drop' : 'Drag a box here'}</div>
         :<div><ConstructorElement
                type="top"
                isLocked={true}
                key={Bun._Id}
                text={`${Bun.name}`}
                price={Bun.price}
                thumbnail={Bun.image}
         /></div>
        }
       </div>  
        <div className={styles.scroll}>
          {dataItem.length === 0 ?      
          <div className={styles.box}></div>
          :
          dataItem.map((element, index) => {
            return element.type !== 'bun' && 
              <div  key={element.key} >
                <DragIcon type="primary" className={styles.drag} />
                <ConstructorElement
                  style={{ maxHeight: 80 }}
                  text={element.name}
                  key={element.key}
                  price={element.price}
                  thumbnail={element.image}
                  element={element}
                  handleClose={ (() => deleteElement(element.key))}
                />
              </div>
              
          })}
        </div>
       
        <div className={styles.bottom}>
        { (Bun === null)? 
         <div className={styles.boxBottom}>{isActive ? 'Release to drop' : 'Drag a box here'}</div>
         :<div><ConstructorElement
            type="bottom" 
            isLocked={true}
            key={Bun._id + 1}
            text={`${Bun.name}`}
            price={Bun.price}
            thumbnail={Bun.image}
            /></div>
        }
        </div>
    
    </div>
    )
}