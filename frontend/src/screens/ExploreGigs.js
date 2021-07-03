import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GigsSuggestions from '../components/GigsSuggestions'
import SingleGig from '../components/SingleGig'

export default function ExploreGigs() {


    const [Gigs, setGigs] = useState(null)
    useEffect(() => {
        axios.get('/api/gigs').then(res => {
            setGigs(res.data)
        }
        )

    }, [])


    return (
        <div>
        <div className="row center">
        {Gigs && Gigs.map(gig => <SingleGig gig={gig} />)}
        </div>

        <GigsSuggestions/>
            
        </div>
    )
}
