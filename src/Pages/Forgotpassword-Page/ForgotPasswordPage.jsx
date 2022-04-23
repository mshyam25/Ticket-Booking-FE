import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Message from '../../Components/Message/Message'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import './ForgotPasswordPage.styles.css'
import { findUser, resetPasswordLink } from '../../redux/actions/userActions'
const ForgotPasswordPage = () => {
  const dispatch = useDispatch()

  const userFind = useSelector((state) => state.userFind)
  const { loading, error, success, user } = userFind

  const passwordResetLink = useSelector((state) => state.passwordResetLink)
  const {
    loading: loadingLink,
    error: errorLink,
    success: successLink,
  } = passwordResetLink

  const textFieldStyles = { style: { fontSize: 18 } }
  const formValidation = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
  })
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        dispatch(findUser(values.email))
      },
    })
  const sendVerificationLink = () => {
    dispatch(resetPasswordLink(values.email))
  }
  return (
    <div className='container align-center-box'>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {loadingLink && <Loader />}
      {errorLink && <Message variant='danger'>{errorLink}</Message>}
      {successLink && <Message variant='info'>{successLink}</Message>}
      {!success && (
        <>
          <h2>Enter Your Email Id</h2>

          <form onSubmit={handleSubmit} className='form-container'>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='email'
              name='email'
              value={values.email}
              label='Email'
              variant='filled'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
            />
            <span className='text-field'>
              {errors.email && touched.email ? errors.email : ''}
            </span>
            <Button type='submit' className='btn-med' variant='warning'>
              Find Account
            </Button>
          </form>
        </>
      )}
      {success && !successLink && (
        <>
          <h3>Your Account is Verified.</h3>
          <h3>
            Please click below to send a new password reset link to your email.
          </h3>
          <Button
            className='verify-btn'
            variant='info'
            onClick={() => sendVerificationLink()}>
            Reset Password
          </Button>
        </>
      )}
    </div>
  )
}

export default ForgotPasswordPage
