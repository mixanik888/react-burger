import React from 'react';
import  './Header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const Header = () => (
    <header>
             
        <ul style={{ color: 'white' }} class="p-4">
            <li className="text text_type_main-default"><a href="#" className='text-decoration'> <BurgerIcon type="primary" class="p-4"/> Конструктор</a></li>
            <li className="text text_type_main-default"><a href="#" className='text-decoration'> <ListIcon type="primary" class="p-4"/> Лента заказов</a></li>
        </ul>
        
        <Logo />
        
        <ul style={{ color: 'white' }} className="p-4">
            <li className="text text_type_main-default"><a href="#" className='text-decoration'></a></li>
            <li className="text text_type_main-default"><a href="#" className='text-decoration'> <BurgerIcon type="primary" /> Личный кабинет</a></li>
        </ul>  
    
    </header>   
  
  );