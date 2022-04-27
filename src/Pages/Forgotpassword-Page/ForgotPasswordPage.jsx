import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'

//Toaster,Loader,CSS
import Loader from '../../Components/Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  const textFieldStyles = { style: { fontSize: '2rem' } }
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
  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'top-center',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const successToast = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  useEffect(() => {
    if (error) errorToast(error)
    if (errorLink) errorToast(errorLink)
    if (successLink) {
      successToast('Email Sent')
    }
  }, [error, errorLink, successLink])
  return (
    <div className='container flex-box-center'>
      <ToastContainer />
      {loading || (loadingLink && <Loader />)}

      {successLink && <span className='secondary-header'>{successLink}</span>}
      {!success && (
        <>
          <Card className='form-section'>
            <span className='secondary-header'>Enter Your Email Id</span>

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
              <div className='btn-container'>
                <Button type='submit' className='cta-btn-md' variant='warning'>
                  Find Account
                </Button>{' '}
              </div>
            </form>
          </Card>
        </>
      )}
      {success && !successLink && (
        <Card className='form-section'>
          <span className='secondary-header'>
            <h3>Your Account is Verified.</h3>
            Please click below to send a new password reset link to your email.
          </span>
          <Button
            className='cta-btn-md'
            variant='info'
            onClick={() => sendVerificationLink()}>
            Reset Password
          </Button>
        </Card>
      )}
    </div>
  )
}

export default ForgotPasswordPage
