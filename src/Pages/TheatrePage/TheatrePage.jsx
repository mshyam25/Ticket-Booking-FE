import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment'
import { getTheatreById } from '../../redux/actions/theatreActions'
import './TheatrePage.styles.css'
import { confirmMySeats } from '../../redux/actions/seatActions'
const TheatrePage = () => {
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [color, setColor] = useState(false)
  const [seats, setSeats] = useState([])
  const [seatId, setSeatId] = useState([])
  // let maxDate
  // // const max = date.setDate(date.getDate() + theatre.runningDays)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

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
    console.log(time)
    console.log(date)
    findSeats(time, date)
  }

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
    navigate('/')
  }

  useEffect(() => {
    dispatch(getTheatreById(params.id))
  }, [dispatch, confirmation, clearance])
  return (
    <>
      <div className='container'>
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
                        <ListGroupItem className='seat-selected'>
                          <span className='span-class-2 margin-right-sm'>
                            You have Selected :
                          </span>
                          <div className='flex-box'>
                            {seats.map((s) => {
                              return (
                                <span className='span-class-2 margin-right-sm'>
                                  {s}
                                </span>
                              )
                            })}
                          </div>

                          <span className='span-class-2 margin-right-sm'>
                            Total Seats : {seats.length}
                          </span>
                          <span className='span-class-2 margin-right-sm'>
                            {' '}
                            Total Cost : Rs.{' '}
                            {seats.length * theatre.ticketPrice}
                          </span>
                          <Button
                            onClick={() => confirmingSeats()}
                            variant='success'
                            className='confirm-btn'>
                            Confirm Seats
                          </Button>
                        </ListGroupItem>
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
