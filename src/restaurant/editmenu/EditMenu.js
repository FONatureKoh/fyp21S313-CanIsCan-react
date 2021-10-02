import React, {useRef, useState}from 'react'
import TopNav from '../../components/top-nav/topnav'
import './EditMenu.css'

export default function EditMenu() {

  const dynamic = useRef();
  const [loaded, setLoaded] = useState(false);

  const data = [
    {
      name: 'Kelvin',
      age: 12
    },
    {
      name: 'Thomas',
      age: 22
    },
    {
    name: 'Donna',
      age: 123
    },
    {
      name: 'Duncan',
      age: 312
    },
    {
      name: 'Hong Wei',
      age: 312
    },
    {
      name: 'Prem',
      age: 312
    },
    {
      name: 'Tian',
      age: 312
    }
  ]

  return (
    <div className="main">
        <TopNav />
        <div className="add">
            <button className="addBtn">Add Item</button>
        </div>
        <div className="container">
          <div className="buttonContainer">
            <div className="buttons" ref= {dynamic}>
              {
                data.map(element =>  <button class="menu_btn"> {element.name} </button>)
              }
            </div>
          </div>
        </div>
    </div>
  )
}
