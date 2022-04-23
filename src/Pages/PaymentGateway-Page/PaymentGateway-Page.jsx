import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
const PaymentGatewayPage = () => {
  const [time, setTime] = useState(10)
  const [msg, setMsg] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const bookingItems = useSelector((state) => state.bookingItems)
  const { bookingDetails } = bookingItems
  console.log(bookingDetails)
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (!bookingDetails) {
      navigate('/theatres')
    }
  }, [dispatch, bookingDetails])

  const interval = setInterval(function () {
    if (time < 1) {
      setMsg(
        'Your timer has runout.Your reserved seats are again open.You will now be redirected to the Homepage.'
      )
      clearInterval(interval)
    } else {
      setTime(time - 1)
    }
    //do whatever here..
  }, 1000)
  if (time < 1) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  useEffect(() => {})
  return (
    <div>
      <div className='container align-center-box'>
        <h1>PaymentsPage</h1>
      </div>
    </div>
  )
}

export default PaymentGatewayPage
