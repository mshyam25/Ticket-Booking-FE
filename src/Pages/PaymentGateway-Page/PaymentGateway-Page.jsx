import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { API } from '../../utils'
import { Card } from 'react-bootstrap'
import Loader from '../../Components/Loader/Loader'
import Message from '../../Components/Message/Message'
import { bookSeats } from '../../redux/actions/seatActions'
import { newMovieBooking } from '../../redux/actions/bookingActions'
const PaymentGatewayPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const bookingItems = useSelector((state) => state.bookingItems)
  const { bookingDetails } = bookingItems

  const bookSeat = useSelector((state) => state.bookSeat)
  const {
    loading: loadingBookingSeats,
    success: successBookingSeats,
    error: errorBookingSeats,
  } = bookSeat

  const newBooking = useSelector((state) => state.newBooking)
  const {
    loading: loadingNewBooking,
    success: successNewBooking,
    error: errorNewBooking,
  } = newBooking
  let booking = {}

  if (bookingDetails) {
    booking = {
      theatreId: bookingDetails.theatreId,
      date: bookingDetails.date,
      time: bookingDetails.showTime,
      seatId: bookingDetails.seatId,
    }
  }

  useEffect(() => {
    if (!bookingDetails || !userInfo) {
      navigate('/theatres')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${API}/paypalclient`)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`

      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [userInfo, bookingDetails, dispatch, navigate])

  const paymentHandler = (paymentResult) => {
    dispatch(newMovieBooking(bookingDetails))

    dispatch(bookSeats(booking))
    setPaymentStatus(paymentResult)
  }
  return (
    <div className='payment-container'>
      {errorBookingSeats && (
        <Message variant='danger'>{errorBookingSeats}</Message>
      )}
      {errorNewBooking && <Message variant='danger'>{errorNewBooking}</Message>}
      {!sdkReady || loadingBookingSeats || loadingNewBooking ? (
        <Loader />
      ) : !paymentStatus ? (
        <>
          {' '}
          <span className='secondary-header'>PaymentsPage</span>
          <Card>
            <PayPalButton
              amount={bookingDetails.totalPrice}
              onSuccess={paymentHandler}></PayPalButton>
          </Card>
        </>
      ) : paymentStatus && successBookingSeats && successNewBooking ? (
        <span className='secondary-text'>
          Your payment is Completed. Booking Details are sent to your email.
        </span>
      ) : (
        ''
      )}
    </div>
  )
}

export default PaymentGatewayPage
