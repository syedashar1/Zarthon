import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel , Table} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Charts from '../components/Charts'
import CheckIcon from '@material-ui/icons/Check';



export default function GigOrdersScreen(props) {

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const [Orders, setOrders] = useState([])
        const history = useHistory()

        useEffect(() => {
                axios.get(`/api/orders/myorders` , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res=>setOrders(res.data.reverse() ) )
        }, [])


        return (
                <div>
                
                <Container>
                <Table striped bordered hover>
                        <thead>
                        <tr>
                        <th>#</th>
                        <th>Gig Title</th>
                        <th>Total Amount</th>
                        <th>Placed On</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Orders.map((x,i)=>    <tr>
                        <td>{i+1}</td>
                        <td>{x.title}</td>
                        <td>{x.totalPrice}</td>
                        <td>{x.paidAt.split('T')[0].split('-').reverse().join('-') } </td>
                        <td>{x.status}</td>
                        <td> <button onClick={()=>history.push(`/gig-order/${x._id}`)} > More </button>{' '} <button> Contact </button>  </td>
                        </tr> )}
                        
                        </tbody>
                </Table>
                </Container>
                        
                </div>
        )
}

