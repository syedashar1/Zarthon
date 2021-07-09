import React, { Component } from 'react'

export default class Ratings extends Component {
        render() {

                const {rating , numReviews , caption } = this.props

                return (
                        <div>
                                <div className="rating">
                                        <span>
                                                <i
                                                className={
                                                rating >= 1
                                                ? 'fa fa-star'
                                                : rating >= 0.5
                                                ? 'fa fa-star-half-o'
                                                : 'fa fa-star-o'
                                                }
                                                ></i>
                                        </span>
                                        <span>
                                                <i
                                                className={
                                                rating >= 2
                                                ? 'fa fa-star'
                                                : rating >= 1.5
                                                ? 'fa fa-star-half-o'
                                                : 'fa fa-star-o'
                                                }
                                                ></i>
                                        </span>
                                        <span>
                                                <i
                                                className={
                                                rating >= 3
                                                ? 'fa fa-star'
                                                : rating >= 2.5
                                                ? 'fa fa-star-half-o'
                                                : 'fa fa-star-o'
                                                }
                                                ></i>
                                        </span>
                                        <span>
                                                <i
                                                className={
                                                rating >= 4
                                                ? 'fa fa-star'
                                                : rating >= 3.5
                                                ? 'fa fa-star-half-o'
                                                : 'fa fa-star-o'
                                                }
                                                ></i>
                                        </span>
                                        <span>
                                                <i
                                                className={
                                                rating >= 5
                                                ? 'fa fa-star'
                                                : rating >= 4.5
                                                ? 'fa fa-star-half-o'
                                                : 'fa fa-star-o'
                                                }
                                                ></i>
                                        </span>
                                              {caption ? ( <span>{caption}</span> ) : (  <span>{numReviews + ' reviews'}</span>)}
                                        </div>
                        </div>
                )
        }
}