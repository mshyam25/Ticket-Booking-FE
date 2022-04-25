import React, { useEffect } from 'react'
import Message from '../../Components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { getUserList } from '../../redux/actions/userActions'
import { Table } from 'react-bootstrap'

const UsersListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else dispatch(getUserList())
  }, [dispatch])

  return (
    <>
      <div className='container'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <strong>USER ID</strong>
              </th>

              <th>Username</th>
              <th>Email</th>
              <th>Is Admin ?</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        {/* <div className='grid grid--3--cols'>
          
        </div> */}
      </div>
    </>
  )
}

export default UsersListPage
