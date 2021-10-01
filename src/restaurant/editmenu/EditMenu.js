import React from 'react'
import TopNav from '../../components/top-nav/topnav'
import './EditMenu.css'

export default function EditMenu() {

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
    }
  ]

  return (
    <div className="main">
        <TopNav />
        <div className="container">
          <div class="menu">
            {
              data.map(element => <div class="menuItem"> {element.name} </div>) 
            }
          </div>
        </div>
    </div>
  )
}
