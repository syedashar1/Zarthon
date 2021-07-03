import React, { useEffect , useState } from 'react';
import axios from 'axios';

export default function SinglePost({ id , postid }) {



        const [state ,setState ] = useState({})
        const [loading, setloading] = useState(false)


        useEffect( async () => {
                
                setloading(true)
                axios.get(`/api/newsfeed/getpost/${id}/${postid}`)
                .then(res => {
                        setState(res.data);
                        setloading(false);
                } )


                

        }, [ ]);



        return (
                <div style={{padding:"20px"}}> 
                {!loading && state && state.post && <>
                <img src={state.post.pic} alt="uploaded pic" className='image-to-hover'/>
                <div className="middle-text">
                <p>{state.post.likes.length}</p>
                </div> </>
                }       
                        
                        
                </div>
        )
}






