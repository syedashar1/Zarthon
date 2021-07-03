import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useHistory } from 'react-router';

const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1224 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1224, min: 764 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 764, min: 0 },
          items: 3
        }
};

export default function Suggestions({users}) {


        const history = useHistory()


        return (
                <div>
                <h1 style={{marginBottom:'-25px',marginLeft:'15px' }} >People You May Know</h1>
                <Carousel responsive={responsive}>
                {users.map( x => <div className='suggested-cards' onClick={()=>history.push(`/user/${x._id}`)} >
                        <div> <img src={x.profilePic} ></img> </div>
                        <h1> {x.name} </h1>
                        <p> {x.email} </p>

                </div> )}



                </Carousel>;



                </div>
        )
}
