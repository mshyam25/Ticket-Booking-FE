import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { userLogIn } from '../../redux/actions/userActions'
import './Signin.styles.css'
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const textFieldStyles = { style: { fontSize: 18 } }

  const userSignIn = useSelector((state) => state.userSignIn)
  const { loading, error, userInfo } = userSignIn

  const formValidation = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
    password: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: '', password: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        dispatch(userLogIn(values.email, values.password))
        console.log('Signed in')
      },
    })

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo])
  return (
    <>
      <div className='container form-section'>
        <span className='signin-header'>SIGN IN PAGE</span>

        <form onSubmit={handleSubmit} className='form-container'>
          <TextField
            InputProps={textFieldStyles}
            InputLabelProps={textFieldStyles}
            id='email'
            name='email'
            value={values.email}
            label='Email'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
          />
          <span className='text-field'>
            {errors.email && touched.email ? errors.email : ''}
          </span>
          <TextField
            InputProps={textFieldStyles}
            InputLabelProps={textFieldStyles}
            id='password'
            name='password'
            value={values.password}
            label='Password'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
          />
          <span className='text-field'>
            {errors.password && touched.password ? errors.password : ''}
          </span>
          <a href='/forgotpassword' className='text-field'>
            Forgot password ?
          </a>
          <Button type='submit'>Sign in</Button>
        </form>
      </div>
    </>
  )
}

export default SignIn
