import React from 'react'
import Slide from 'react-reveal/Slide';

export default function AboutScreen() {
        return (
                <Slide left>
                      <div className='form' style={{maxWidth:'800px' , marginTop:20 , marginBottom:50 , padding:' 50px 0px ',textAlign:'center'}}>
                      <h1 className='logo'>Coolgram</h1>
                        <p className='desc' >About Us</p>

                        <p className='desc2'>This is an Instagram Clone Built by Ashar using MERN Stack</p>
                        <p className='desc2'>It has all the features of the Instagram and additional features like get the know the longitude
                        of every user on Map and many other features , with a mobile friendly Frontend !
                        </p>
                        <p className='desc2'>Time taken to built this Web App was 27 days</p>
                        <p className='desc2'>Tech Stack used in its making are :</p>
                        <p className='desc2' style={{ fontSize:30}}>ReactJS , REDUX , MongoDB , FireBase , Socket.Io , NodeJS and ExpressJS</p>
                        <p className='desc2'>From getting a Message to sending a notification everything is built for real time display !</p>
                      </div>  
                </Slide>
        )
}
