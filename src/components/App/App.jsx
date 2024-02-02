import React from 'react';
import HeaderAPPP from '../AppHeader/Header';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import PriceCount from '../PriceCount/PriceCount';
import IngredientDetails from '../Ingredient-detali/Ingredientdetali';
import OrderDetails from '../OrderDetali/OrderDetali';
import Modal from '../Modal/Modal';
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { AddOrder, loadIngredient } from '../services/actions/actions';
import { useSelector } from 'react-redux';
import { addConstructorItem, deleteConstructorItem, addConstructorBun, ClearConstructor} from '../services/reducers/ConstructorReducer';
import { SetActionIngredient } from '../services/reducers/ActionIngredientReducer';


export default function App () {
  const dispatch = useDispatch();
  const {loading, error, data1}   = useSelector(store => store.Data); 
  const {ActionIngredient}        = useSelector(store => store.AcIngredient); 
  const {bun, Ingredients} = useSelector(store => store.Burger);
  const [isOpen, setOpen] = React.useState(false)
  //const [element, setElement] = React.useState({}); 
  console.log(bun);

  const ingredients = [];

  React.useEffect(() => {
    dispatch(loadIngredient());
     }, [dispatch]);
   
  
  if (loading || data1.length === 0) {
    return (
      <h2>Загрузка...</h2>
    );
  }
  
  if (!loading && error) {
    return (
      <h2>error: {error}</h2>
    );
  }  

  const deleteElement = (e) => {
    dispatch (deleteConstructorItem(e));
  }

  const handleElementClick = (e) => {
    
    const element = data1.data.find(item => item._id === e.target.id);

    if (element.type !== 'bun') {
      dispatch (addConstructorItem(element));
    } 
    else {
      dispatch (addConstructorBun(element));
    }
   }
  
  const closeModal = () => {
      setOpen(!isOpen);
    }
  
  const handleOrderToBayClick = () => {
    
    if (bun !== null) {
      
      ingredients.push(bun._id);
      
      for (const item of Ingredients) {ingredients.push(item._id);}
      
      ingredients.push(bun._id);
    
      dispatch (AddOrder(ingredients));  
      dispatch (SetActionIngredient(null));
      dispatch (ClearConstructor());
      setOpen(!isOpen);

    }
  
    }
  
  const OpenIngredientDetailsClick = (e, item) => {
    
      dispatch (SetActionIngredient(item)); 
      setOpen(!isOpen);

    }

    return (
      <div> 
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {<div className={styles.App}> <HeaderAPPP />   
        <main className={styles.content}>
          <section className={styles.ingredients}>
              <BurgerIngredients
              handleElementClick={handleElementClick}
              OpenIngredientDetailsClick={OpenIngredientDetailsClick} />
          </section>
          <section className={styles.constructor} >
            <BurgerConstructor 
            deleteElement={deleteElement}/>
            <div className={styles.count}>
              <PriceCount/>
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
        {(ActionIngredient !== null) ? <IngredientDetails /> : <OrderDetails />}
      
      </Modal>
        : null}
    </div>}
    </div>  
    )    
} 
