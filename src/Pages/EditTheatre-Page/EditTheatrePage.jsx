import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getTheatreById,
  updateTheatre,
} from '../../redux/actions/theatreActions'
import Loader from '../../Components/Loader/Loader'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'
import Moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditTheatrePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const theatreById = useSelector((state) => state.theatreById)
  const { theatre } = theatreById

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else {
      dispatch(getTheatreById(params.id))
    }
  }, [dispatch, userInfo])
  return <>{theatre ? <UpdateMovie theatre={theatre} id={params.id} /> : ''}</>
}

function UpdateMovie({ theatre, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const textFieldStyles = { style: { fontSize: 18 } }
  const editTheatre = useSelector((state) => state.editTheatre)
  const { loading, error, success } = editTheatre
  const handleCheckChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const formValidation = yup.object({
    theatreName: yup
      .string()
      .required('Theatre Name is required')
      .matches(
        '[a-zA-Z][a-zA-Z ]+[a-zA-Z]{2,16}$',
        'Theatre Name should be minimum 2 characters and only letters are allowed'
      ),
    movieName: yup
      .string()
      .required('Movie Name is required')
      .matches(
        '[a-zA-Z][a-zA-Z ]+[a-zA-Z]{2,24}$',
        'Movie Name should be minimum 2 characters and only letters are allowed'
      ),
    cast: yup.string().required('Cast is required'),
    director: yup
      .string()
      .required('Director is required')
      .matches(
        '[a-zA-Z][a-zA-Z ]+[a-zA-Z]{2,20}$',
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
      .matches('^[a-zA-Z ]{1,16}$', 'Rating should be minimum 1 character.'),
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
    releaseDate: yup.string().required('Release Date is Required'),
    lastDate: yup.string().required('Last Date is Required'),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        theatreName: theatre.theatreName,
        movieName: theatre.currentMovie.movieName,
        cast: theatre.currentMovie.cast,
        poster: theatre.currentMovie.poster,
        director: theatre.currentMovie.director,
        language: theatre.currentMovie.language,
        runtime: theatre.currentMovie.runtime,
        rating: theatre.currentMovie.rating,
        runningDays: theatre.runningDays,
        theatreArea: theatre.theatreArea,
        releaseDate: theatre.releaseDate,
        lastDate: theatre.lastDate,
        ticketPrice: theatre.ticketPrice,
        showTimings: [],
      },
      validationSchema: formValidation,
      onSubmit: () => {
        values.showTimings = shows

        dispatch(updateTheatre(values, id))
      },
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

  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  useEffect(() => {
    if (success) {
      successToast(success)
      setTimeout(() => {
        navigate('/theatres')
      }, 4000)
    }
    if (error) {
      errorToast(error)
    }
  }, [success, error])
  return (
    <div className='container theatre-form-container'>
      <h2>EDIT THEATRE </h2>
      <ToastContainer />
      {loading && <Loader />}
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

        <TextField
          InputProps={textFieldStyles}
          InputLabelProps={textFieldStyles}
          id='theatreArea'
          name='theatreArea'
          value={values.theatreArea}
          label='Theatre Area'
          variant='outlined'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.theatreArea && touched.theatreArea}
        />
        <span className='text-field'>
          {errors.theatreArea && touched.theatreArea ? errors.theatreArea : ''}
        </span>
        <div className='date-picker flex-box'>
          <label for='releaseDate'>Release Date : </label>
          <input
            type='date'
            id='releaseDate'
            name='releaseDate'
            value={values.releaseDate}
            // min={Moment(theatre.releaseDate).format('YYYY-MM-DD')}
            min={Moment(new Date()).format('YYYY-MM-DD')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className='date-picker flex-box'>
          <label for='lastDate'>Last Date : </label>
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
          <Button type='submit' variant='warning' className='cta-btn'>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditTheatrePage
