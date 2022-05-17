import React from 'react'
import logo from '../../images/Rick-and-Morty-001.svg'
import style from './Nav.module.scss'
import { Link } from 'react-router-dom'


const Nav = ({favCharacters}) => {
  return (
    <nav id='nav' className={style.nav}>
      <Link to='/'>
        <div className={style.header}>
          <img src={logo} height={50} alt="Rick and Morty Logo" />
          <h1 className={style.headerText}>Rick and Morty</h1>
        </div>
      </Link>

      <Link to='/favourite'>
        <div className={style.favourite}>
          Go to yours favourites! <span>{favCharacters.length}</span>
        </div>
      </Link>
    </nav>
  )
}

export default Nav