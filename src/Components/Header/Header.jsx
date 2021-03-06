import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actions/userActions'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const userLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }
  return (
    <header className='header'>
      <a className='main-nav-link' href='/'>
        <BookOnlineIcon className='logo' />{' '}
      </a>
      <nav className='main-nav'>
        <ul className='main-nav-list'>
          <li>
            <a className='main-nav-link' href='/theatres'>
              {userInfo && userInfo.isAdmin ? 'Theatres' : 'Book Tickets'}
            </a>
          </li>

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
                <a className='main-nav-link' href='/addtheatre'>
                  Add Theatre
                </a>
              </li>
            </>
          )}
          {/* </ul>
          <ul className='main-nav-list sign-nav'> */}
          <li>
            {userInfo && (
              <a className='main-nav-link' href='/profile'>
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
  )
}

export default Header
