import React, {useRef, useState}from 'react'
import TopNav from '../../components/top-nav/topnav'
import './EditMenu.css'
import ViewMenuList from '../../components/rest-view-menu/ViewMenuList';


export default function EditMenu() {
  
  const dynamic = useRef();
  const [loaded, setLoaded] = useState(false);

  const data = [
    {
      id: 1,
      name: 'Chicken Chop',
      price: 7.90,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 2,
      name: 'Chicken Cutlet',
      price: 8.90,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 3,
      name: 'Chicken Wing (2pcs)',
      price: 3.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 4,
      name: 'Kobe Beef Steak (100g)',
      price: 99.90,
      desc: 'Most premium beef you can find in town!',
      allergies:'-'
    },
    {
      id: 5,
      name: 'Fish n Chips',
      price: 9.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 6,
      name: 'Seafood Platter',
      price: 15.90,
      desc: 'Delightful ',
      allergies:'Shell (Prawn, Clams)'
    },
    {
      id: 7,
      name: 'Fries',
      price: 11.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 8,
      name: 'Chicken Nugget (10pcs)',
      price: 3.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 9,
      name: 'Cheese Dipping Sauce',
      price: 2.00,
      desc: 'Delightful ',
      allergies:'-'
    },
  ]

  return (
    <div className="main">
        <TopNav />
        <div className="emenu_add">
            <button className="emenu_addBtn">Add Item</button>
        </div>
        <div className="emenu_buttons" ref= {dynamic}>
          {
            <ViewMenuList menu_items={data} />
            //<button class="emenu_btn"> {element.name} </button>
          }
        </div>
    </div>
  )
}
