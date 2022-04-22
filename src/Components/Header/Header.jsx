import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/userActions'

import './Header.styles.css'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { loading, error, userInfo } = userSignIn
  const userLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }
  return (
    <>
      <header className='header'>
        <nav className='main-nav'>
          <img
            className='logo'
            alt='Omnifood-logo'
            src='img/omnifood-logo.png'
          />
          <ul className='main-nav-list'>
            <li>
              <a className='main-nav-link' href='/'>
                HOME
              </a>
            </li>
            <li>
              <a className='main-nav-link' href='/theatres'>
                BOOK TICKETS
              </a>
            </li>
            <li>
              <a className='main-nav-link' href='/offers'>
                VIEW OFFERS
              </a>
            </li>
          </ul>
        </nav>
        <nav className='main-nav'>
          <ul className='main-nav-list'>
            {userInfo && (
              <>
                {' '}
                <li>
                  <a className='main-nav-link' href='/'>
                    PROFILE
                  </a>
                </li>
                <li>
                  <a className='main-nav-link' href='/'>
                    MY BOOKINGS
                  </a>
                </li>
              </>
            )}

            {userInfo && userInfo.isAdmin && (
              <>
                <li>
                  <a className='main-nav-link' href='/users'>
                    USERS
                  </a>
                </li>
                <li>
                  <a className='main-nav-link' href='/bookings'>
                    BOOKINGS
                  </a>
                </li>
              </>
            )}

            <li>
              {userInfo ? (
                <a
                  className='main-nav-link nav-cta'
                  href='#'
                  onClick={userLogout}>
                  LOGOUT
                </a>
              ) : (
                <a className='main-nav-link nav-cta' href='/signin'>
                  SIGN IN
                </a>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
