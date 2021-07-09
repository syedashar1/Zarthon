import React, { Component } from 'react'
import { Col, Row , Container } from 'react-bootstrap'
import Button from '@material-ui/core/Button';

export default class Home extends Component {
        render() {
                return (
                        <div>
                        <Container>
                        <Row>
                        <Col>
                        <h1 style={{fontSize:'65px' , color:'green' }} >Join the office of the Global Workforce.</h1>
                        <h1 style={{fontSize:'30px' , color:'gray' }}>For your bussiness.Find talent</h1>
                        <h1 style={{fontSize:'30px' , color:'gray' }}>Take your career to the next level.</h1>
                        <h1 style={{fontSize:'30px' , color:'gray' }}>
                        <Button variant="contained" size='large' color="primary"><h4>Register</h4></Button>{'   '}
                        <Button variant="contained" size='large' color="primary"><h4>Register</h4></Button>
                        </h1>
                        </Col>
                        <Col>
                        <div style={{height:'400px' , width:'100%' , backgroundSize:'cover' ,backgroundPosition:'center'
                        , backgroundImage:'url(https://img.freepik.com/free-vector/modern-business-team-working-open-office-space_74855-5541.jpg?size=626&ext=jpg)' }} />
                        </Col>
                        </Row>
                        </Container>
                        </div>
                )
        }
}
