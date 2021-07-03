import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UpdatesScreen() {

    const [Updates, setUpdates] = useState(null)

    useEffect(() => {
        axios.get('/api/users/showupdates').then(res=>{if(res.data) setUpdates(res.data) ;  })
    }, [])

    return (
        <div>
        <h1><b>UPDATES SCREEN</b></h1>
        {Updates && Updates.map(x=>
            <div>
            <h1>{x.title}</h1>
            <p>{x.desc}</p>
            </div>)

        }
            
        </div>
    )
}
