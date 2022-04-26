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
          <ul className='main-nav-list'>
            <li>
              <a className='main-nav-link' href='/'>
                <img
                  className='logo'
                  alt='Omnifood-logo'
                  src='img/omnifood-logo.png'
                />
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
                  <a className='main-nav-link' href='/profile'>
                    MY PROFILE
                  </a>
                </li>
              </>
            )}
            {userInfo && !userInfo.isAdmin && (
              <>
                {' '}
                <li>
                  <a className='main-nav-link' href='/theatres'>
                    BOOK TICKETS
                  </a>
                </li>
                <li>
                  <a
                    className='main-nav-link'
                    href={`/userbookings/${userInfo._id}`}>
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
                  <a className='main-nav-link' href='/theatres'>
                    THEATRES
                  </a>
                </li>
              </>
            )}

            <li>
              {userInfo ? (
                <>
                  <a className='main-nav-link' href=''>
                    {userInfo.name}
                  </a>
                  <a
                    className='main-nav-link nav-cta'
                    href='/signin'
                    onClick={userLogout}>
                    LOGOUT
                  </a>
                </>
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
