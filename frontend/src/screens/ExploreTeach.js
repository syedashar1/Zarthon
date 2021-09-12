import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GigsSuggestions from '../components/GigsSuggestions'
import SinglePro from '../components/SinglePro'
import { Col, Container, Pagination, Row  } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { MDBCol } from "mdbreact";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, useParams ,useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



export default function ExplorePro(props) {


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
        pageNumber = 0 ,
        earned = 0 , 
        successRatio = 0
      } = useParams();


    const [Pros, setPros] = useState(null)
    const [Title, setTitle] = useState(title || '')
    const [Min, setMin] = useState(min || 0)
    const [Max, setMax] = useState(max || 0)
    const [Language, setLanguage] = useState(language || '')
    const [TAGS, setTAGS] = useState([])
    const [ATag, setATag] = useState('')
    const [Country, setCountry] = useState(country || '')
    const [Sort, setSort] = useState(sort || 'rating')
    const history = useHistory()
    const [PageNumber, setPageNumber] = useState(pageNumber || 1)
    const [TotalPros, setTotalPros] = useState(0)
    const [Pages, setPages] = useState(1)
    const [SuccessRatio, setSuccessRatio] = useState(successRatio || 0)
    const [Earned, setEarned] = useState(earned || 0)


    useEffect(() => {
        axios.get(`/api/teachers?title=${title }&tags=${ tags }&min=${min}&max=${max}&successRatio=${successRatio}&earned=${earned}&country=${country}&language=${language  }&sort=${sort}&pageNumber=${pageNumber}`)
        .then(res => {
            setPros(res.data.pros)
            setPages(res.data.pages)
            setTotalPros(res.data.totalPros)
        }
        )
        
    }, [props.match.params])

    const updateUrl = () => {   
        console.log(title);
        history.push(`/explore-teacher/title/${Title || 'all' }/tags/${ TAGS.length > 0 ? TAGS.toString().split(',').join('+') : 'all' }/min/${Min || 0}/max/${Max || 0}/successRatio/${SuccessRatio || 0}/earned/${Earned || 0}/country/${Country || 'all'  }/language/${Language || 'all'  }/sort/${Sort || 'rating'}/pageNumber/${PageNumber || 1}`)
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

    <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1a-content" id="panel1a-header" >
          <h2 style={{color:'grey'}} >Select Skills</h2>
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

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1b-content" id="panel1b-header" >
          <h2  style={{color:'grey'}}>Budget</h2>
        </AccordionSummary>
        <AccordionDetails><p><hr/>
            <div className='row center ' >
              <div>
              <h2>Min</h2>
              <input type='number' value={Min} onChange={(e)=>setMin(e.target.value)} style={{maxWidth:'100px'}} />
              </div>
              <div className='col-5 '>
              <h2>Max</h2>
              <input type='number' value={Max} onChange={(e)=>setMax(e.target.value)} style={{maxWidth:'100px'}} />
              </div>
            </div>


            <br/>
          <div className='row center' >
          <IconButton><UpdateIcon style={{fontSize:'30px'}}  onClick={updateUrl}/></IconButton>
          <IconButton><BackspaceIcon style={{fontSize:'30px'}} onClick={()=>{ setMin(0) ; setMax(0) ; updateUrl() }} /> </IconButton>
          </div>
          </p></AccordionDetails>

          
      </Accordion>

      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header" >
          <h2 style={{color:'grey'}} >Select Success Ratio</h2>
        </AccordionSummary>
        <AccordionDetails><p><hr/>
        <input onChange={e=>setSuccessRatio(e.target.value)} type='number' max='100' min='0' value={SuccessRatio}  placeholder='Any' />
        <br/>
          <div className='row center' >
          <IconButton><UpdateIcon style={{fontSize:'30px'}}  onClick={updateUrl} /></IconButton>
          <IconButton><BackspaceIcon style={{fontSize:'30px'}}  onClick={()=>{ setSuccessRatio(0) ; updateUrl() }} /> </IconButton>
          </div>
          </p></AccordionDetails>
      </Accordion> */}

      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header" >
        <h2 style={{color:'grey'}} >Select Total Earned</h2>
      </AccordionSummary>
      <AccordionDetails><p><hr/>
      <input onChange={e=>setEarned(e.target.value)} value={Earned} type='number' placeholder='Any' />
      <br/>
        <div className='row center' >
        <IconButton><UpdateIcon style={{fontSize:'30px'}}  onClick={updateUrl} /></IconButton>
        <IconButton><BackspaceIcon style={{fontSize:'30px'}}  onClick={()=>{ setEarned(0) ; updateUrl() }} /> </IconButton>
        </div>
        </p></AccordionDetails>
    </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header" >
          <h2 style={{color:'grey'}} >Select Country</h2>
        </AccordionSummary>
        <AccordionDetails><p><hr/>
        <input onChange={e=>setCountry(e.target.value)} value={Country}  placeholder='Any' />
        <br/>
          <div className='row center' >
          <IconButton><UpdateIcon style={{fontSize:'30px'}}  onClick={updateUrl} /></IconButton>
          <IconButton><BackspaceIcon style={{fontSize:'30px'}}  onClick={()=>{ setCountry('') ; updateUrl() }} /> </IconButton>
          </div>
          </p></AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1d-content" id="panel1d-header" >
          <h2 style={{color:'grey'}} >Prefered Language</h2>
        </AccordionSummary>
        <AccordionDetails><p><hr/>
        <input onChange={e=>setLanguage(e.target.value)} value={Language}  placeholder='Any' />
        <br/>
          <div className='row center' >
          <IconButton><UpdateIcon style={{fontSize:'30px'}}  onClick={updateUrl} /></IconButton>
          <IconButton><BackspaceIcon style={{fontSize:'30px'}} onClick={()=>{ setLanguage('') ; updateUrl() }} /> </IconButton>
          </div>
        </p></AccordionDetails>
      </Accordion>

      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1d-content" id="panel1d-header" >
        <h2 style={{color:'grey'}} >Sort Teachers</h2>
      </AccordionSummary>
      <AccordionDetails><p><hr/>
      

      <RadioGroup aria-label="gender" name="gender1" value={Sort} onChange={(e)=>setSort(e.target.value)} >
        <FormControlLabel value="rating" control={<Radio />} label="Highest Ratings" />
        <FormControlLabel value="mostjobs" control={<Radio />} label="Most Tasks Done" />
        <FormControlLabel value="new" control={<Radio />} label="New Talent" />
      </RadioGroup>

      </p></AccordionDetails>
    </Accordion>

    </div>
    
    </Col>
    <Col md={9}>

    <form className="row center " onSubmit={(e)=>{e.preventDefault();updateUrl() }} >
      <input onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" placeholder="Search Teachers" aria-label="Search" style={{width:'600px' , fontSize:'30px'}} />
      <IconButton type="submit"  aria-label="search"> <SearchIcon  style={{fontSize:'30px'}} /></IconButton>
      </form>
    <br/><p style={{textAlign:'right' , paddingRight:'20px' , fontWeight:'bolder' , color:'gray' }} >{TotalPros + ' Teachers Found' }</p><br/>
        
    <div className="" style={{minHeight:'1000px'}}>
        
        <Container>
        {Pros && Pros.map(pro => <SinglePro pro={pro} type='teacher' /> )}
        </Container>
        
    </div><br/><br/>
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

        
            
        </div>
    )
}
