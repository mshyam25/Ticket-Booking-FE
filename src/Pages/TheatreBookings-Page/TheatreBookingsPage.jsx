import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { bookingsOfTheatre } from '../../redux/actions/bookingActions'
import { Table } from 'react-bootstrap'
import './TheatreBookingsPage.styles.css'
const UsersListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const theatreBookings = useSelector((state) => state.theatreBookings)
  const { bookings, loading, error } = theatreBookings

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else dispatch(bookingsOfTheatre(params.id))
  }, [dispatch])

  return (
    <>
      <div className='container'>
        {loading ? (
          <Loader />
        ) : bookings ? (
          <>
            <h1>{bookings[0].theatreName}</h1>
            <h3>{bookings[0].movieName}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <strong>BOOKING ID</strong>
                  </th>

                  <th>Username</th>
                  <th>Date</th>
                  <th>Showtime</th>
                  <th>Seats</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{booking._id}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.date}</td>
                      <td>{booking.showTime}</td>
                      <td>
                        {booking.seats.map((seat, index) => {
                          return `${seat}, `
                        })}
                      </td>
                      <td>{booking.totalPrice}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <h1 className='bookings-txt'>No Bookings Made for this Theatre.</h1>
        )}
      </div>
    </>
  )
}

export default UsersListPage
