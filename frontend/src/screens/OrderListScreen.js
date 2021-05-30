import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

function OrderListScreen({history}) {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const detailHandler = (id) => {
        history.push(`/order/${id}`)
    }

    return (
        <div>
            <h1>Orders</h1>
            {loading
            ? <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>ID</th>
                                <th>USER</th>
                                <th className='text-center'>DATE</th>
                                <th className='text-center'>TOTAL</th>
                                <th className='text-center'>PAID</th>
                                <th className='text-center'>DELIEVRED</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} onClick={() => detailHandler(order._id)} style={{cursor:'pointer'}}>
                                    <td className='text-center'>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td className='text-center'>{order.createdAt.substring(0, 10)}</td>
                                    <td className='text-center'>{order.totalPrice}</td>
                                    <td className='text-center'>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}
                                    </td>
                                    <td className='text-center'>{order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )

            }
        </div>
    )
}

export default OrderListScreen
