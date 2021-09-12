import React from 'react';
import { Col, Container, Image, Row , Tabs , Tab} from 'react-bootstrap';
import CheckIcon from '@material-ui/icons/Check';
import { useHistory } from "react-router-dom";


export default function Charts({beginner , standard , premium , id}) {


  const history = useHistory()


  return (
    <div style={{ padding:'0px',marginTop:'50px'}} className='form' id='chart'>
      
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Basic"  >
      
      <Row>
      <Col>
      
      <h1>{beginner.title}</h1>
      </Col>
      <Col>
      <h1><b>${beginner.price}</b></h1>
      </Col>
      <br></br>
      <br></br>
      <h4>{beginner.desc}</h4>
      
      <Col>
      <br></br>
      <h1>{beginner.delivery}{' DaysDelivery'} </h1>
      </Col>
      <Col>
      <br></br>
      <h1>{beginner.revisions}{' revisions'}</h1>
      </Col>
      
      

      </Row>

      <br></br>

      {beginner.offers.map(x=>

      <h2><CheckIcon style={{color:'green',fontSize:'20px',marginRight:'10px'}}/>{x}</h2>
      
      )}

        <div className='row center'>
          <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',margin:'20px',
          border: '1px solid transparent' }} type="submit"
          onClick={()=>history.push(`/gig-payment-gateway/${id}/${'beginner'}`)}
          > {'Continue with ' + beginner.price }$ </button>
         </div>

            
            
      </Tab>


      <Tab eventKey="profile" title="Standard"  >
      
      <Row>
      <Col>
      
      <h1>{standard.title}</h1>
      </Col>
      <Col>
      <h1><b>${standard.price}</b></h1>
      </Col>
      <br></br>
      <br></br>
      <h4>{standard.desc}</h4>
      
      <Col>
      <br></br>
      <h1>{standard.delivery}{' DaysDelivery'} </h1>
      </Col>
      <Col>
      <br></br>
      <h1>{standard.revisions}{' revisions'}</h1>
      </Col>
      
      

      </Row>

      <br></br>

      {standard.offers.map(x=>

      <h2><CheckIcon style={{color:'green',fontSize:'20px',marginRight:'10px'}}/>{x}</h2>
      
      )}

        <div className='row center'>
          <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',margin:'20px',
          border: '1px solid transparent' }} type="submit" 
          onClick={()=>history.push(`/gig-payment-gateway/${id}/${'standard'}`)}
           > {'Continue with ' + standard.price }$ </button>
         </div>

      </Tab>




      <Tab eventKey="contact" title="Premium" >
      
      <Row>
      <Col>
      
      <h1>{premium.title}</h1>
      </Col>
      <Col>
      <h1><b>${premium.price}</b></h1>
      </Col>
      <br></br>
      <br></br>
      <h4>{premium.desc}</h4>
      
      <Col>
      <br></br>
      <h1>{premium.delivery}{' DaysDelivery'} </h1>
      </Col>
      <Col>
      <br></br>
      <h1>{premium.revisions}{' revisions'}</h1>
      </Col>
      
      

      </Row>

      <br></br>

      {premium.offers.map(x=>

      <h2><CheckIcon style={{color:'green',fontSize:'20px',marginRight:'10px'}}/>{x}</h2>
      
      )}

        <div className='row center'>
          <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',margin:'20px',
          border: '1px solid transparent' }} type="submit" 
          onClick={()=>history.push(`/gig-payment-gateway/${id}/${'premium'}`)}
          > {'Continue with ' + premium.price }$ </button>
         </div>

      </Tab>

    </Tabs> 
      
    </div>
  )
}
