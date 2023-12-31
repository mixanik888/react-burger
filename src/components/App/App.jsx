import React from 'react';
import HeaderAPPP from '../AppHeader/Header';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PriceCount from '../PriceCount/PriceCount';
import IngredientDetali from '../Ingredient-detali/Ingredientdetali';
import OrderDetails from '../OrderDetali/OrderDetali';
import Modal from '../Modal/Modal';
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App.module.css';
import getIngredients from '../utils/burger-api';



export default function App () {
  const [data, setData] = React.useState([]);
  const [arr] = React.useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isOpen, setOpen] = React.useState(false)
  const [element, setElement] = React.useState({}); 

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    
    getIngredients('https://norma.nomoreparties.space/api', setData, setError, setLoading);

    }, []);

  const OpenIngredientDetailsClick = (e, item) => {
      setElement(item);
      setOpen(!isOpen);
    }
  
  const handleElementClick = (e) => {
    const element = data.find(item => item._id === e.target.id);
        if (!element.count) {
          element.count = 0;
        }
        if (!arr.find(m => (m.type === 'bun')) || element.type !== 'bun') {
          element.count = element.count + 1
          arr.push(element);
          forceUpdate();
        }
        setElement(element);
      }
  
  const closeModal = () => {
      setOpen(!isOpen);
    }
  
  const handleOrderToBayClick = () => {
      setElement(false)
      setOpen(!isOpen);
    }

    return (
      <div> 
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {data&& <div className={styles.App}> <HeaderAPPP />   
        <main className={styles.content}>
          <section className={styles.ingredients}>
              <BurgerIngredients data={data}
              handleElementClick={handleElementClick}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick} />
          </section>
          <section className={styles.constructor} >
            <BurgerConstructor data={arr} />
            <div className={styles.count}>
              <PriceCount data={arr} />
              <div className={styles.button} >
                <Button
                  type="primary" size="large"
                  htmlType='submit'
                  onClick={handleOrderToBayClick}>
                  Оформить заказ
                </Button>
              </div>
            </div>
          </section>
      
        </main>
       
        {isOpen ? <Modal onClick={closeModal} onClose={closeModal} >
        {element ? <IngredientDetali ingredient={element} /> : <OrderDetails />}
      </Modal>
        : null}
    </div>}
    </div>  
    )    
} 
