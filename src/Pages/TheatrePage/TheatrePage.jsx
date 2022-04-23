import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap'
import Loader from '../../Components/Loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment'
import { getTheatreById } from '../../redux/actions/theatreActions'
import './TheatrePage.styles.css'
import { confirmMySeats } from '../../redux/actions/seatActions'
import { bookingConstants } from '../../redux/constants/bookingConstants'
const TheatrePage = () => {
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [color, setColor] = useState(false)
  const [seats, setSeats] = useState([])
  const [seatId, setSeatId] = useState([])
  // const [ticketsPrice, setTicketsPrice] = useState(0)
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

  const ticketsPrice = 130
  const taxPrice = ticketsPrice * 0.1
  const totalPrice = ticketsPrice + taxPrice
  const handleSeatSelection = async (s, e) => {
    setColor(!color)
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
    const theatreId = theatre._id
    const booking = { theatreId, date, time, seatId }
    dispatch(confirmMySeats(booking))
    dispatch({
      type: bookingConstants.BOOKING_ITEMS_ADD,
      payload: {
        userId: userInfo._id,
        userName: userInfo.name,
        bookingDetails: [
          {
            theatre: theatre.theatreName,
            date: date,
            showTime: time,
            qty: seats.length,
          },
        ],
        taxPrice,
        totalPrice,
      },
    })
    navigate('/paymentgateway')
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    dispatch(getTheatreById(params.id))
  }, [dispatch, confirmation, clearance])
  return (
    <>
      <div className='container'>
        {loadingTheatre && <Loader />}
        <Card className='big-card'>
          {theatre ? (
            <div className='seat-section'>
              <div>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <div className='seat-section-header'>
                      <span className='movie-name'>
                        {theatre.currentMovie.movieName}(
                        {theatre.currentMovie.rating})
                      </span>
                      <span className='theatre-name'>
                        {' '}
                        {theatre.theatreName}
                      </span>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className='date-picker flex-box'>
                      <span className='span-class-2'>Choose a Date :</span>

                      <input
                        type='date'
                        id='start'
                        name='trip-start'
                        value={date}
                        // min={Moment(theatre.releaseDate).format('YYYY-MM-DD')}
                        min={Moment(new Date()).format('YYYY-MM-DD')}
                        max={Moment(theatre.lastDate).format('YYYY-MM-DD')}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className='shows-box flex-box'>
                      {theatre.showTimings.map((show, index) => (
                        <Badge
                          key={index}
                          variant='primary'
                          className='show-time'
                          onClick={() => setTime(show)}>
                          {show}
                        </Badge>
                      ))}
                    </div>
                  </ListGroupItem>
                  {seatsThisShow.length > 0 && (
                    <>
                      <ListGroupItem className='seat-sec'>
                        <Row className='d-flex justify-content-center text-center'>
                          <Col>
                            <h3>Pick Your Seats</h3>
                            <ListGroupItem>
                              <div className='seat-classification flex-box'>
                                <div className='seat-category flex-box'>
                                  <span className='span-class-2'>
                                    Available :
                                  </span>
                                  <FontAwesomeIcon
                                    className='available-icon icn'
                                    icon={faCouch}
                                  />
                                </div>
                                <div className='seat-category flex-box'>
                                  <span className='span-class-2'>Booked :</span>
                                  <FontAwesomeIcon
                                    className='booked-icon icn'
                                    icon={faCouch}
                                  />
                                </div>
                                <div className='seat-category flex-box'>
                                  <span className='span-class-2'>
                                    Reserved :
                                  </span>
                                  <FontAwesomeIcon
                                    className='reserved-icon icn'
                                    icon={faCouch}
                                  />
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                        </Row>
                      </ListGroupItem>

                      <ListGroupItem>
                        <div className='seat-box'>
                          <div className='box'>
                            <span className='naming-class'></span>

                            {seatsThisShow.map((row) => {
                              return row.map((seatRow, index) => {
                                return (
                                  <span
                                    className={`${
                                      index === 1 || index === 7
                                        ? 'margin-right-sm'
                                        : ''
                                    } naming-class`}>
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
                                  <div className='box'>
                                    <span className='naming-class'>{`${String.fromCharCode(
                                      64 + index + 1
                                    )}`}</span>
                                    {seatRow.map((s, index) => {
                                      return (
                                        <span
                                          className={`${
                                            index === 1 || index === 7
                                              ? 'margin-right-sm'
                                              : ''
                                          } naming-class margin-bottom-xs`}
                                          onClick={(e) =>
                                            handleSeatSelection(s, e)
                                          }>
                                          {s.isBooked ? (
                                            <FontAwesomeIcon
                                              className='booked-icon icn'
                                              icon={faCouch}
                                            />
                                          ) : s.isReserved ? (
                                            <FontAwesomeIcon
                                              className='reserved-icon icn'
                                              icon={faCouch}
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                              className='available-icon icn'
                                              icon={faCouch}
                                            />
                                          )}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </>
                              )
                            })
                          })}
                        </div>
                        <Row className='d-flex justify-content-center text-center mt-3'>
                          <Col>
                            <h1>Screen</h1>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      {seats.length > 0 ? (
                        <ListGroup className='seat-selected'>
                          <div className='s-b-grid'>
                            <span className='span-class-2'>Theatre :</span>
                            <span className='span-class-2'>
                              {theatre.theatreName}
                            </span>
                            <span className='span-class-2'>Movie :</span>
                            <span className='span-class-2'>
                              {theatre.currentMovie.movieName}
                            </span>
                            <span className='span-class-2'>Date :</span>
                            <span className='span-class-2'>{date}</span>
                            <span className='span-class-2'>Show Time :</span>
                            <span className='span-class-2'>{time}</span>
                            <span className='span-class-2'>
                              Seats Selected :
                            </span>
                            <div className='s-b-flex'>
                              {seats.map((s) => {
                                return (
                                  <span className='span-class-2'>{s},</span>
                                )
                              })}
                            </div>

                            <span className='span-class-2 '>Total Seats :</span>
                            <span className='span-class-2 '>
                              {seats.length}
                            </span>
                            <span className='span-class-2'>Ticket Price :</span>
                            <span className='span-class-2 '>
                              Rs.
                              {ticketsPrice}
                            </span>
                            <span className='span-class-2 '>Tax Price :</span>
                            <span className='span-class-2 '>
                              Rs.
                              {taxPrice}
                            </span>
                            <span className='span-class-2 '>Total Price :</span>
                            <span className='span-class-2 '>
                              Rs.
                              {totalPrice}
                            </span>
                          </div>
                          <Button
                            onClick={() => confirmingSeats()}
                            variant='success'
                            className='confirm-btn'>
                            Confirm Seats
                          </Button>
                        </ListGroup>
                      ) : (
                        <ListGroupItem className='seat-selected'>
                          {' '}
                          <span className='span-class-2 '>
                            Select Your seats{' '}
                          </span>
                        </ListGroupItem>
                      )}
                    </>
                  )}
                </ListGroup>
              </div>
            </div>
          ) : (
            ''
          )}
        </Card>
      </div>
    </>
  )
}

export default TheatrePage
