import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Message from '../../Components/Message/Message'
import { verificationEmailTrigger } from '../../redux/actions/verificationEmailActions'
import './Verificationemail.styles.css'
const Verificationemail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const verificationEmail = useSelector((state) => state.verificationEmail)
  const { loading, error, message } = verificationEmail
  console.log(error)
  const sendVerificationLink = () => {
    dispatch(verificationEmailTrigger(params.email))
  }
  return (
    <div className='container verification-box'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : message ? (
        <Message variant='info'>{message}</Message>
      ) : (
        <>
          <h3>Your Verification link has expired or invalid.</h3>
          <h3>
            Please click below to send a new verification Link to your
            registered email.
          </h3>
          <Button
            className='verify-btn'
            variant='info'
            onClick={() => sendVerificationLink()}>
            Send Verification Link
          </Button>
        </>
      )}
    </div>
  )
}

export default Verificationemail
