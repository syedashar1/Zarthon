import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GigsSuggestions from '../components/GigsSuggestions'
import SingleGig from '../components/SingleGig'
import { Col, Container, Pagination, Row  } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, useParams ,useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import BackspaceIcon from '@material-ui/icons/Backspace';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SingleJob from '../components/SingleJob';


export default function ExploreJobs(props) {




        const {
        title = 'all',
        tags = [],
        min = 0,
        max = 0,
        rating = 0,
        delivery = 0,
        country = 'all',
        language = 'all',
        sort = 'rating',
        pageNumber = 0
        } = useParams();
              
        const [Title, setTitle] = useState(title || '')
        const [Min, setMin] = useState(min || 0)
        const [Max, setMax] = useState(max || 0)
        const [Language, setLanguage] = useState(language || '')
        const [TAGS, setTAGS] = useState([])
        const [ATag, setATag] = useState('')
        const [Delivery, setDelivery] = useState(delivery || 0)
        const [Country, setCountry] = useState(country || '')
        const [Sort, setSort] = useState(sort || 'rating')
        const history = useHistory()
        const [PageNumber, setPageNumber] = useState(pageNumber || 1)
        const [TotalGigs, setTotalGigs] = useState(0)
        const [Pages, setPages] = useState(1)
          
          
        const [Jobs, setJobs] = useState(null)
          
          
        useEffect(() => {
                console.log('asdadas');
                setJobs(null)
                axios.get(`
                
                /api/jobs?title=${title}&tags=${tags}&pageNumber=${pageNumber}
                
                `).then(res => {
                console.log(res.data);
                setJobs(res.data.jobs)
                setTotalGigs(res.data.totalJobs)
                }
                )
        }, [props.match.params])
          
          
        const updateUrl = () => {
        
        console.log(title);
        history.push(`/explore-jobs/title/${Title || 'all' }/tags/${ TAGS.length > 0 ? TAGS.toString().split(',').join('+') : 'all' }`)
        
        }
          
        useEffect(() => {
        
        updateUrl()
        
        }, [TAGS ,Sort , PageNumber])






        return (
                <div>
            <br/><br/><br/>    
                
                <>
          <Row className='top' >
            <Col md={3}>
            <div style={{background:'' ,width:'100%' , textAlign:'center' , padding:'5px'}} >
            <h1>Advanced Filters</h1>
        
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1a-content" id="panel1a-header" >
                  <h2 >Select Skills</h2>
                </AccordionSummary>
                <AccordionDetails><p><hr/>
                  <div className='row center' >
                  <input onChange={e=>setATag(e.target.value)} value={ATag} style={{maxWidth:'60%'}} placeholder='Any Tag' />
                  <IconButton onClick={()=>{if(ATag) setTAGS([...TAGS , ATag]);setATag('')}} >Add</IconButton>
                  </div>
                  {TAGS && TAGS.map(x=>
                          <h3><br/>
                          <span style={{background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'20px',cursor:'pointer' }}
                          onClick={()=>{setTAGS(TAGS.filter(e=>e !== x ))}} >
                          {x}{' x'}</span>
                          </h3>
                  )}
                  
                  <br/>
                  <div className='row center' >
                  <IconButton><UpdateIcon style={{fontSize:'30px'}} onClick={updateUrl}/></IconButton>
                  <IconButton><BackspaceIcon style={{fontSize:'30px'}} onClick={()=>{ setTAGS([]) ; updateUrl() }} /> </IconButton>
                  </div>
        
                  </p></AccordionDetails>
              </Accordion>
        
              
        
            </div>
            
            </Col>
            <Col md={9}>
        
            <form className="row center " onSubmit={(e)=>{e.preventDefault();updateUrl() }} >
              <input onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" placeholder="Search Jobs" aria-label="Search" style={{width:'600px' , fontSize:'30px'}} />
              <IconButton type="submit"  aria-label="search"> <SearchIcon  style={{fontSize:'30px'}} /></IconButton>
              </form>
            <br/><p style={{textAlign:'right' , paddingRight:'20px' , fontWeight:'bolder' , color:'gray' }} >{TotalGigs + ' Jobs Found' }</p><br/>
            
            <Container>
                {Jobs && Jobs.map(job => 
                <SingleJob job={job} type='proworker' />
                // <div>{job._id}</div>

                )}
            </Container>
            
            <br/><br/>
                 {Pages && <Row>
                  <Col md={3}></Col>
                  <Col md={9}>
                  <Pagination className='text-center'>
                  
                  <Pagination.Prev onClick={()=>{if(PageNumber-1 > 0) setPageNumber(PageNumber-1) }}/>
                  {[...Array(Pages).keys()].map((x) => (
                  <Pagination.Item className={ x+1 == PageNumber ? 'this-active' : ''}  onClick={()=>{setPageNumber(x+1)}} >{x+1}</Pagination.Item>
                  ))}
                  <Pagination.Next onClick={()=>{if(PageNumber+1 <= Pages) setPageNumber(PageNumber+1) }}/>
                </Pagination>
                  </Col>
                  </Row> }
                  
                  <br/><br/>
            
            </Col>
          </Row>
        </>
        
                
        
                {/* <GigsSuggestions/> */}
                    
                </div>
            )
        }
        
