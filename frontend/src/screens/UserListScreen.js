import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../actions/userActions'

function UserListScreen({history}) {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete


    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const editHandler = (id) => {
        history.push(`/admin/user/${id}/edit`)
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
            ? <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th className='text-center'>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th className='text-center'>ADMIN</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} onClick={() => editHandler(user._id)} style={{cursor:'pointer'}}>
                                        <td className='text-center'>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className='text-center'>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{color:'green'}}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )

            }
        </div>
    )
}

export default UserListScreen
