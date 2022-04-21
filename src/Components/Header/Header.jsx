import React from 'react'
import './Header.styles.css'

const Header = () => {
  return (
    <>
      <div className='main-nav-bar'>
        <ul className='flex-box list'>
          <li>LOGO</li>
          <li>
            <a href='/'>HOME</a>
          </li>
          <li>
            <a href='/theatres'>BOOK TICKETS</a>
          </li>
          <li>
            <a href='/offers'>VIEW OFFERS</a>
          </li>
        </ul>{' '}
        <ul className='flex-box list'>
          <li>
            <a href='/myaccount'>MY ACCOUNT</a>
          </li>
          <li>
            <a href='/signin'>SIGN IN</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header
