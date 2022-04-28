import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getTheatreById } from '../../redux/actions/theatreActions'
import Loader from '../../Components/Loader/Loader'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Checkbox from '@material-ui/core/Checkbox'
import { addTheatre } from '../../redux/actions/theatreActions'
import { theatreConstants } from '../../redux/constants/theatreConstants'

const AddNewTheatrePage = () => {
  const [state, setState] = useState({
    '10.30 A.M': false,
    '2.30 P.M': false,
    '6.30 P.M': false,
    '10.30 P.M': false,
    '4:30 A.M': false,
    '7.30 A.M': false,
  })

  const stateKeys = Object.keys(state)
  const shows = stateKeys.filter((key) => state[key] === true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const textFieldStyles = { style: { fontSize: 18 } }

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const newTheatre = useSelector((state) => state.newTheatre)
  const { loading: loadingTheatre, error: errorTheatre, success } = newTheatre

  const formValidation = yup.object({
    theatreName: yup
      .string()
      .required('Theatre Name is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Theatre Name should be minimum 2 characters and only letters are allowed'
      ),
    movieName: yup.string().required('Movie Name is required'),
    cast: yup.string().required('Cast is required'),
    director: yup
      .string()
      .required('Director is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Director should be minimum 2 characters and only letters are allowed'
      ),
    poster: yup.string().required('Poster is required'),
    language: yup
      .string()
      .required('Language is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Language should be minimum 2 characters and only letters are allowed'
      ),
    rating: yup
      .string()
      .required('Rating is required')
      .matches(
        '^[a-zA-Z ]{1,16}$',
        'Rating should be minimum 1 character1 and only letters are allowed'
      ),
    runtime: yup.string().required('Runtime is required'),
    runningDays: yup
      .string()
      .required('Running Days is required')
      .matches('^(0|[1-9][0-9]*)$', 'Numeric Value is required'),

    ticketPrice: yup
      .string()
      .required('Ticket Price required')
      .matches('^(0|[1-9][0-9]*)$', 'Numeric Value is required'),
    theatreArea: yup
      .string()
      .required('Theatre Area is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Theatre Area should be minimum 2 characters and only letters are allowed'
      ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        theatreName: '',
        movieName: '',
        cast: '',
        poster: '',
        director: '',
        language: '',
        runtime: '',
        rating: '',
        theatreArea: '',
        runningDays: '',
        releaseDate: '',
        lastDate: '',
        ticketPrice: '',
        showTimings: [],
      },
      validationSchema: formValidation,
      onSubmit: () => {
        values.showTimings = shows
        dispatch({ type: theatreConstants.ADD_THEATRE_RESET })
        dispatch(addTheatre(values))
      },
    })

  const successToast = (msg) =>
    toast.success(msg, {
      position: 'top-right',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'top-right',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    }
    if (errorTheatre) errorToast(errorTheatre)
    if (success) {
      successToast('Theatre added')
      setTimeout(() => {
        navigate('/theatres')
      }, 3000)
    }
  }, [dispatch, userInfo])
  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <div className='container theatre-form-container'>
      <h2>ADD NEW THEATRE </h2>
      <ToastContainer />
      {loadingTheatre && <Loader />}
      <form onSubmit={handleSubmit} className='theatre-form'>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='theatreName'
          name='theatreName'
          value={values.theatreName}
          label='Theatre Name'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.theatreName && touched.theatreName}
          className='txt-box'
        />
        <span className='text-field'>
          {errors.theatreName && touched.theatreName ? errors.theatreName : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='movieName'
          name='movieName'
          value={values.movieName}
          label='Movie Name'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.movieName && touched.movieName}
        />
        <span className='text-field'>
          {errors.movieName && touched.movieName ? errors.movieName : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='cast'
          name='cast'
          type='cast'
          value={values.cast}
          label='Cast'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.cast && touched.cast}
        />
        <span className='text-field'>
          {errors.cast && touched.cast ? errors.cast : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='poster'
          name='poster'
          value={values.poster}
          label='Poster'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.poster && touched.poster}
        />
        <span className='text-field'>
          {errors.poster && touched.poster ? errors.poster : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='director'
          name='director'
          value={values.director}
          label='Director'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.director && touched.director}
        />
        <span className='text-field'>
          {errors.director && touched.director ? errors.director : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='language'
          name='language'
          value={values.language}
          label='Language'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.language && touched.language}
        />
        <span className='text-field'>
          {errors.language && touched.language ? errors.language : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='runtime'
          name='runtime'
          value={values.runtime}
          label='Runtime'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.runtime && touched.runtime}
        />
        <span className='text-field'>
          {errors.runtime && touched.runtime ? errors.runtime : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='rating'
          name='rating'
          value={values.rating}
          label='Rating'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.rating && touched.rating}
        />
        <span className='text-field'>
          {errors.rating && touched.rating ? errors.rating : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='ticketPrice'
          name='ticketPrice'
          value={values.ticketPrice}
          label='Ticket Price'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.ticketPrice && touched.ticketPrice}
        />
        <span className='text-field'>
          {errors.ticketPrice && touched.ticketPrice ? errors.ticketPrice : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='theatreArea'
          name='theatreArea'
          value={values.theatreArea}
          label='Area'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.theatreArea && touched.theatreArea}
        />
        <span className='text-field'>
          {errors.theatreArea && touched.theatreArea ? errors.theatreArea : ''}
        </span>
        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='runningDays'
          name='runningDays'
          value={values.runningDays}
          label='Running Days'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.runningDays && touched.runningDays}
        />
        <span className='text-field'>
          {errors.runningDays && touched.runningDays ? errors.runningDays : ''}
        </span>
        <div className='date-picker flex-box'>
          <label for='releaseDate' className='label-txt'>
            Release Date :{' '}
          </label>
          <input
            type='date'
            id='releaseDate'
            name='releaseDate'
            value={values.releaseDate}
            min={Moment(new Date()).format('YYYY-MM-DD')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='date-picker flex-box'>
          <label for='lastDate' className='label-txt'>
            Last Date :{' '}
          </label>
          <input
            type='date'
            id='lastDate'
            name='lastDate'
            value={values.lastDate}
            // min={Moment(theatre.releaseDate).format('YYYY-MM-DD')}
            min={Moment(new Date()).format('YYYY-MM-DD')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='shows'>
          <label for='' className='label-txt'>
            Shows :{' '}
          </label>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='10.30 A.M'
                color='primary'
              />
            }
            label='10.30 A.M'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='2.30 P.M'
                color='primary'
              />
            }
            label='2.30 P.M'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='6.30 P.M'
                color='primary'
              />
            }
            label='6.30 P.M'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='10.30 P.M'
                color='primary'
              />
            }
            label='10.30 P.M'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='4.30 A.M'
                color='primary'
              />
            }
            label='4.30 A.M'
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckChange}
                name='7.30 A.M'
                color='primary'
              />
            }
            label='7.30 A.M'
          />
        </div>
        <div className='btn-container'>
          <Button type='submit' className='cta-btn' variant='info'>
            Add Theatre
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddNewTheatrePage
