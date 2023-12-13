import React from 'react';
import  './Header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Box} from '@ya.praktikum/react-developer-burger-ui-components'

export const Header = () => (
    <header>
      
        
        <ul style={{ color: 'white' }} className="p-4">
            <li className="text text_type_main-default"><a href=""> <BurgerIcon type="primary" />Конструктор</a></li>
            <li className="text text_type_main-default"><a href=""> <ListIcon type="primary" />Лента заказов</a></li>
        </ul>
        <Logo />

    
    </header>   
  
  );