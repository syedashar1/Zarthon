import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePro from '../components/SinglePro'

export default function ExplorePro() {

    const [Pros, setPros] = useState(null)
    useEffect(() => {
        axios.get('/api/professionals').then(res => {
            setPros(res.data)
        }
        )

        
    }, [])


    return (
        <div>
        <h1>This is explore pro page</h1>
        {Pros && Pros.map(pro => <SinglePro pro={pro} /> )}
        {Pros && Pros.length }

        </div>
    )
}
