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
      name: 'Kelvin',
      age: 'dumb bumdbasdbqweklnasd',
      desc:'testest'
    },
    {
      id: 2,
      name: 'Thomas',
      age: 22,
      desc:'testest'
    },
    {
      id: 3,
      name: 'Donna',
      age: 123,
      desc:'testest'
    },
    {
      id: 4,
      name: 'Duncan',
      age: 312,
      desc:'testest'
    },
    {
      id: 5,
      name: 'Hong Wei',
      age: 312,
      desc:'testest'
    },
    {
      id: 6,
      name: 'Prem',
      age: 312,
      desc:'testest'
    },
    {
      id: 7,
      name: 'Tian',
      age: 312,
      desc:'testest'
    },
    {
      id: 8,
      name: 'Tian',
      age: 312,
      desc:'testest'
    },
    {
      id: 9,
      name: 'Tian',
      age: 312,
      desc:'testest'
    }
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
