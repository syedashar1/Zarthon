import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleGig from './SingleGig'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function GigsSuggestions({tags}) {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1224 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1224, min: 764 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 764, min: 0 },
          items: 2
        }
};

    const [Gigs, setGigs] = useState(null)

    useEffect(() => {
        axios.post('/api/gigs/suggestion' , {tags}).then(res=>{if(res.data)setGigs(res.data)})
    }, [])
    
    return (
        <div>{Gigs && <Carousel responsive={responsive}>
        {Gigs.map( gig => <SingleGig gig={gig} /> )}



        </Carousel> }
            
        </div>
    )
}
