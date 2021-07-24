import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UpdatesScreen() {

    const [Updates, setUpdates] = useState(null)

    useEffect(() => {
        axios.get('/api/users/showupdates').then(res=>{if(res.data) setUpdates(res.data) ;  })
    }, [])

    return (
        <div>
        
        <div>
        <h1 ><b>UPDATES SCREEN</b></h1>
        {Updates && Updates.map(x=>
            <div>
            <br/>
            <div  className='form p-5'  >
            <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}  >{x.title}</h1>
            <p>{x.desc}</p>
            </div>
            </div>
        )
        

        }
        </div>
            <br/><br/>
        </div>
    )
}
