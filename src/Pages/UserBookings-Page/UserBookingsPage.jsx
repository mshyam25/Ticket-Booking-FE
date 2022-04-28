import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { Table } from 'react-bootstrap'
import { bookingsOfUser } from '../../redux/actions/bookingActions'

const UserBookingsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userBookings = useSelector((state) => state.userBookings)
  const { myBookings, loading } = userBookings
  console.log(myBookings)
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else dispatch(bookingsOfUser(params.id))
  }, [dispatch, params.id, userInfo, navigate])
  return (
    <>
      <div className='container'>
        {loading ? (
          <Loader />
        ) : myBookings ? (
          <>
            <h1>{myBookings[0].userName}'s Bookings</h1>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <strong>BOOKING ID</strong>
                  </th>

                  <th>Theatre</th>
                  <th>Movie</th>
                  <th>Date</th>
                  <th>Showtime</th>
                  <th>Seats</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((booking, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{booking._id}</td>
                      <td>{booking.theatreName}</td>
                      <td>{booking.movieName}</td>
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
          <h2>No Bookings yet !</h2>
        )}
      </div>
    </>
  )
}

export default UserBookingsPage
