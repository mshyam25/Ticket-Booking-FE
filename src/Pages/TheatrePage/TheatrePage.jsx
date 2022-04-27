import React, { useEffect, useState } from 'react'
import { Table, Card, Button } from 'react-bootstrap'
import Loader from '../../Components/Loader/Loader'
import IconButton from '@mui/material/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment'
import { getTheatreById } from '../../redux/actions/theatreActions'
import './TheatrePage.styles.css'
import { confirmMySeats } from '../../redux/actions/seatActions'
import { bookingConstants } from '../../redux/constants/bookingConstants'
import Message from '../../Components/Message/Message'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const TheatrePage = () => {
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [seats, setSeats] = useState([])
  const [seatId, setSeatId] = useState([])
  const [errorMsg, setErrorMsg] = useState(true)
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const theatreById = useSelector((state) => state.theatreById)
  const { loading: loadingTheatre, error: errorTheatre, theatre } = theatreById

  const confirmSeat = useSelector((state) => state.confirmSeat)
  const { loading: loadingConfirmSeat, confirmation, error } = confirmSeat

  const clearReservedSeats = useSelector((state) => state.clearReservedSeats)
  const {
    loading: loadingClearance,
    clearance,
    errorClearance,
  } = clearReservedSeats

  const ticketsPrice =
    theatre && seats ? Number(theatre.ticketPrice * seats.length) : 0
  const taxPrice = Number(ticketsPrice * 0.132).toFixed(2)
  const totalPrice = Number(Number(ticketsPrice) + Number(taxPrice)).toFixed(2)
  const seatsThisShow = []
  const findSeats = (time, date) => {
    theatre.seatAvailability.map((seats) => {
      if (seats.date === date) {
        seats.shows.map((show) => {
          if (show.showTiming === time) {
            seatsThisShow.push(show.seats)
          }
        })
      }
    })
  }

  if (time && date) {
    findSeats(time, date)
  }

  const handleSeatSelection = async (s, e) => {
    if (!seats.includes(s.name)) {
      setSeats(seats.concat(s.name))
      setSeatId(seatId.concat(s._id))

      e.target.classList.toggle('selected')
    } else {
      const modifiedSeats = seats.filter((seat) => seat !== s.name)
      setSeats(modifiedSeats)
      e.target.classList.toggle('selected')
      const modifiedSeatId = seatId.filter((id) => id !== s._id)
      setSeatId(modifiedSeatId)
    }
  }

  const confirmingSeats = () => {
    if (seats.length > 0) {
      // setErrorMsg(false)
      const theatreId = theatre._id
      const booking = { theatreId, date, time, seatId }
      dispatch(confirmMySeats(booking))
      dispatch({
        type: bookingConstants.BOOKING_ITEMS_ADD,
        payload: {
          userId: userInfo._id,
          theatreId: theatre._id,
          date: date,
          showTime: time,
          seatCount: seats.length,
          seats: seats,
          seatId,
          totalPrice,
        },
      })
      navigate('/paymentgateway')
    } else {
      errorToast('Please Select a Seat')
    }
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

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (errorTheatre) errorToast(errorTheatre)
    if (errorClearance) errorToast(errorClearance)
    if (error) errorToast(error)
    // if (errorMsg) errorToast('Please select a Seat')
    dispatch(getTheatreById(params.id))
    setSeatId([])
    setSeats([])
  }, [
    dispatch,
    confirmation,
    clearance,
    time,
    date,
    error,
    errorMsg,
    errorClearance,
    errorTheatre,
  ])
  return (
    <>
      <ToastContainer />
      <div className='container'>
        {loadingTheatre ||
          loadingClearance ||
          (loadingConfirmSeat && <Loader />)}
        {error && <Message variant='danger'>{error}</Message>}
        {errorTheatre && <Message variant='danger'>{errorTheatre}</Message>}
        {errorClearance && <Message variant='danger'>{errorClearance}</Message>}
        <Card className='seat-selection-card'>
          {theatre ? (
            <div>
              <div className='seat-section-header'>
                <span className='movie-name'>
                  {theatre.currentMovie.movieName}({theatre.currentMovie.rating}
                  )
                </span>
                -<span className='theatre-name'> {theatre.theatreName}</span>
              </div>

              <div className='date-picker flex-box'>
                <span>Choose a Date :</span>

                <input
                  type='date'
                  id='start'
                  name='trip-start'
                  value={date}
                  min={Moment(new Date()).format('YYYY-MM-DD')}
                  max={Moment(theatre.lastDate).format('YYYY-MM-DD')}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className='shows flex-box'>
                {theatre.showTimings.map((show, index) => (
                  <button
                    key={index}
                    variant='success'
                    className='show-time'
                    onClick={() => setTime(show)}>
                    {show}
                  </button>
                ))}
              </div>

              {seatsThisShow.length > 0 && (
                <>
                  <div className='seat-classification flex-box'>
                    <div>
                      <span className='margin-right-xs'>Available :</span>
                      <FontAwesomeIcon
                        className='available-icon display-icon'
                        icon={faCouch}
                      />
                    </div>
                    <div>
                      <span className='margin-right-xs'>Booked :</span>
                      <FontAwesomeIcon
                        className='booked-icon display-icon'
                        icon={faCouch}
                      />
                    </div>
                    <div>
                      <span className='margin-right-xs'>Reserved :</span>
                      <FontAwesomeIcon
                        className='reserved-icon display-icon'
                        icon={faCouch}
                      />
                    </div>
                  </div>

                  <div className='grid grid--2--cols booking-container'>
                    <Card className='seat-container shadow-class'>
                      <div className='seats-box'>
                        <span className='naming-class'></span>

                        {seatsThisShow.map((row) => {
                          return row.map((seatRow, index) => {
                            return (
                              <span
                                className={`${
                                  index === 1 || index === 7
                                    ? 'margin-right-sm'
                                    : ''
                                } naming-class margin-bottom-xs`}>
                                {index + 1}
                              </span>
                            )
                          })
                        })}
                      </div>
                      {seatsThisShow.map((row) => {
                        return row.map((seatRow, index) => {
                          return (
                            <>
                              <div className='seats-box'>
                                <span className='naming-class margin-bottom-xs'>{`${String.fromCharCode(
                                  64 + index + 1
                                )}`}</span>
                                {seatRow.map((s, index) => {
                                  return (
                                    <span
                                      className={`${
                                        index === 1 || index === 7
                                          ? 'margin-right-sm'
                                          : ''
                                      } naming-class margin-bottom-xs`}>
                                      {s.isBooked ? (
                                        <IconButton aria-label='seat' disabled>
                                          <FontAwesomeIcon
                                            className='booked-icon seat-icon'
                                            icon={faCouch}
                                          />
                                        </IconButton>
                                      ) : s.isReserved ? (
                                        <IconButton aria-label='seat' disabled>
                                          <FontAwesomeIcon
                                            className='reserved-icon seat-icon'
                                            icon={faCouch}
                                          />
                                        </IconButton>
                                      ) : (
                                        <IconButton
                                          aria-label='seat'
                                          className='icon'
                                          onClick={(e) =>
                                            handleSeatSelection(s, e)
                                          }>
                                          <FontAwesomeIcon
                                            className='available-icon seat-icon'
                                            icon={faCouch}
                                          />
                                        </IconButton>
                                      )}
                                    </span>
                                  )
                                })}
                              </div>
                            </>
                          )
                        })
                      })}

                      <div className='screen'>
                        <span className='primary-heading'>SCREEN</span>
                      </div>
                    </Card>

                    <Card className='seat-selected shadow-class'>
                      <Table striped bordered hover>
                        <tr>
                          <th>
                            <span className='span-class'>Theatre :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class'>
                              {theatre.theatreName}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            {' '}
                            <span className='span-class'>Movie :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class'>
                              {theatre.currentMovie.movieName}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            {' '}
                            <span className='span-class'>Date :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class'>{date}</span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className='span-class'>Show Time :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class'>{time}</span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            {' '}
                            <span className='span-class'>Seats Selected :</span>
                          </th>
                          <td>
                            {' '}
                            <div className='s-b-flex'>
                              {seats.map((s) => {
                                return <span className='span-class'>{s},</span>
                              })}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className='span-class '>Total Seats :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class '>{seats.length}</span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className='span-class'>Ticket Price :</span>
                          </th>
                          <td>
                            <span className='span-class '>
                              Rs.
                              {ticketsPrice}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className='span-class '>Tax Price :</span>
                          </th>
                          <td>
                            <span className='span-class '>
                              Rs.
                              {taxPrice}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            {' '}
                            <span className='span-class '>Total Price :</span>
                          </th>
                          <td>
                            {' '}
                            <span className='span-class '>
                              Rs.
                              {totalPrice}
                            </span>
                          </td>
                        </tr>
                      </Table>

                      <Button
                        onClick={() => confirmingSeats()}
                        variant='success'
                        className='confirm-btn'>
                        Confirm Seats
                      </Button>
                    </Card>
                  </div>
                </>
              )}
            </div>
          ) : (
            // </div>
            ''
          )}
        </Card>
      </div>
    </>
  )
}

export default TheatrePage
