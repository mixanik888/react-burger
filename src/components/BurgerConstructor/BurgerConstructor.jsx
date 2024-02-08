import { useCallback}  from "react";
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteConstructorItem, addConstructorBun, addConstructorItem, spliceConstructorItem } from '../services/reducers/ConstructorReducer';
import { useDrop } from "react-dnd";
import { BurgerElement } from "../BurgerElement/BurgerElement";


export default function BurgerConstructor() {
  
  const dispatch = useDispatch();
  const dataItem = useSelector(store => store.Burger.Ingredients);
  const Bun = useSelector(store => store.Burger.bun);

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

  const deleteConstructorElement = (e) => {
    dispatch (deleteConstructorItem(e));
  }

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex)
    dispatch (spliceConstructorItem( {dragIndex : {dragIndex}, hoverIndex : {hoverIndex}}))

    },[dispatch])


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
              <div  key={element.key}>
                
                <BurgerElement
                    key={element.key}
                    index={index}
                    id={element.key}
                    element={element}
                    moveElement={moveElement}
                    deleteConstructorElement={deleteConstructorElement}
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