import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Message from '../../Components/Message/Message'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'
import { resetPassword } from '../../redux/actions/userActions'

const PasswordResetPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success, updatedUser } = userUpdate
  const textFieldStyles = { style: { fontSize: 18 } }
  const formValidation = yup.object({
    password: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
    confirmpassword: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
  })
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { password: '', confirmpassword: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password === values.confirmpassword) {
          dispatch(resetPassword(params.email, values.password))
        } else {
          alert('Passwords do not match')
        }
      },
    })
  return (
    <>
      <div className='container'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : success ? (
          <Message variant='success'>{updatedUser}</Message>
        ) : (
          <form onSubmit={handleSubmit} className='form-container'>
            <h3>Password Reset</h3>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='password'
              name='password'
              type='password'
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
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='confirmpassword'
              name='confirmpassword'
              value={values.confirmpassword}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmpassword && touched.confirmpassword}
            />
            <span className='text-field'>
              {errors.confirmpassword && touched.confirmpassword
                ? errors.confirmpassword
                : ''}
            </span>

            <Button type='submit'>Sign in</Button>
          </form>
        )}
      </div>
    </>
  )
}

export default PasswordResetPage
