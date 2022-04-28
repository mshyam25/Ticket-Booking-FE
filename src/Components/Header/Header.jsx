import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/userActions'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
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
                  alt='Movies-Logo'
                  src='posters/movies-logo.png'
                />
              </a>
            </li>
            <li>
              <a className='main-nav-link' href='/theatres'>
                Book tickets
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
                    My Profile
                  </a>
                </li>
              </>
            )}
            {userInfo && !userInfo.isAdmin && (
              <>
                {' '}
                <li>
                  <a
                    className='main-nav-link'
                    href={`/userbookings/${userInfo._id}`}>
                    My Bookings
                  </a>
                </li>
              </>
            )}

            {userInfo && userInfo.isAdmin && (
              <>
                <li>
                  <a className='main-nav-link' href='/users'>
                    Users
                  </a>
                </li>

                <li>
                  <a className='main-nav-link' href='/theatres'>
                    Theatres
                  </a>
                </li>
                <li>
                  <a className='main-nav-link' href='/addtheatre'>
                    Add Theatre
                  </a>
                </li>
              </>
            )}

            <li>
              {userInfo && (
                <a className='main-nav-link' href=''>
                  {userInfo.name}
                </a>
              )}
            </li>
            <li>
              {userInfo ? (
                <a
                  className='main-nav-link nav-cta'
                  href='/signin'
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
