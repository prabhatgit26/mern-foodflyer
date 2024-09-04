import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import Navbar from '../Navbar/Navbar';

const ExploreMenu = ({category, setCategory}) => {
  return (<>
    <div className='explore-menu' id='explore-menu'>
      <h1>Savor Our Selection</h1>
      <p className='explore-menu-text'>Explore an array of mouthwatering dishes that cater to every taste and craving.Dive in and find your new favorites, crafted with fresh ingredients and passion for great food.</p>
      <div className="explore-menu-list">
        {
            menu_list.map((item, index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
      </div>
      <hr />    
    </div>
    </>)
}

export default ExploreMenu
