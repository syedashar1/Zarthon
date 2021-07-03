import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { searchUsers } from '../actions/userActions'
import { SEARCH_USERS_RESET } from '../types/userTypes';
import Highlighter from "react-highlight-words";

export default function SearchComponent({Search, setSearch}) {

        const dispatch = useDispatch()
        const history = useHistory()
        const loadingSearch = useSelector((state) => state.searchedUsers.loading);
        const searchedUsers = useSelector((state) => state.searchedUsers.users);
        const searchError = useSelector((state) => state.searchedUsers.error);

        useEffect(() => {
                console.log(Search);
                if(Search.length > 0){
                        dispatch( searchUsers({email : Search}) )
                }
                if(Search.length==0){
                        dispatch({type:SEARCH_USERS_RESET})
                }
        }, [Search])

        return (
                <div style={{textAlign:'center'}} >
                        
                        <input value={Search} onChange={ (e)=>setSearch(e.target.value) } placeholder='Explore'
                        style={{fontSize:'30px',color:'gray',textAlign:'center',margin:'15px 0px'}}

                        />

                        {!loadingSearch && Search.length != 0 && searchedUsers && searchedUsers.map((x)=><p style={{fontSize:'30px'}}>
                        <img style={{height:'100px',width:'100px',borderRadius:'50%'}} src={x.profilePic} ></img>
                        <button>
                        <Highlighter searchWords={[Search]} textToHighlight={x.email} onClick={()=>history.push(`user/${x._id}`)} />
                        </button>
                        </p>)

                        
                        
                        }
                        {!loadingSearch && searchedUsers && searchedUsers.length==0 && <p>No such email found.</p>}
                        
                </div>
        )
}
