import React, { useState } from 'react'
import { Link, useParams ,useHistory } from 'react-router-dom';
import { Col, Container, Pagination, Row ,Button , Dropdown ,ButtonGroup} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchNav() {


    const history = useHistory()
    const [Title, setTitle] = useState( '')
    const [Type, setType] = useState('Search Gigs')

    const updateUrl = () => {


        if(Type === "Search Gigs"){
        history.push(`/explore-gig/title/${Title || 'all' }/tags/${ 'all' }/min/${ 0}/max/${ 0}/delivery/${ 0}/country/${'all'  }/language/${'all'  }/sort/${'rating'}/pageNumber/${ 1}`)
        }
        if(Type === "Search Professionals"){
          history.push(`/explore-pro/title/${Title || 'all' }/tags/${'all' }/min/${ 0}/max/${0}/successRatio/${0}/earned/${ 0}/country/${'all'  }/language/${'all'  }/sort/${ 'rating'}/pageNumber/${ 1}`)    
        }
        if(Type === "Search Teachers"){
          history.push(`/explore-teacher/title/${Title || 'all' }/tags/${'all' }/min/${ 0}/max/${0}/successRatio/${0}/earned/${ 0}/country/${'all'  }/language/${'all'  }/sort/${ 'rating'}/pageNumber/${ 1}`)    
        }
        // console.log(title);
        // history.push(`/explore-gig/title/${Title || 'all' }/tags/${ TAGS.length > 0 ? TAGS.toString().replaceAll(",","+") : 'all' }/min/${Min || 0}/max/${Max || 0}/delivery/${Delivery || 0}/country/${Country || 'all'  }/language/${Language || 'all'  }/sort/${Sort || 'rating'}/pageNumber/${PageNumber || 1}`)
      }

    return (
        <div className='row'>
        <div className='header__right' style={{marginRight:'-10px'}}>
        <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>setType('Search Gigs')} >Search Gigs</Dropdown.Item>
          <Dropdown.Item onClick={()=>setType('Search Professionals')}>Search Professionals</Dropdown.Item>
          <Dropdown.Item onClick={()=>setType('Search Teachers')}>Search Teachers</Dropdown.Item>
        </Dropdown.Menu>
          </Dropdown>
        </div>
        <form className="row center " onSubmit={(e)=>{e.preventDefault();updateUrl() }} >
        <input onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" 
        placeholder={Type} aria-label="Search" style={{width:'200px' , fontSize:'15px',paddingLeft:'30px'}} />
        <IconButton type="submit"  aria-label="search"> <SearchIcon  style={{fontSize:'20px',color:'grey'}} /></IconButton>
        </form>
        </div>
    )
}
