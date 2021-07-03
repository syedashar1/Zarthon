import React, { useEffect , useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Accordion, Card, Carousel, Col, Container, Row , Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class NewsFeed extends Component {
        render() {
                return (
                        <div>
                                
                        </div>
                )
        }
}

export default connect(
        
        (state) => ({ 

                userInfo : state.userSignin.userInfo ,
        
        }),
        {
                
        }

)(NewsFeed);