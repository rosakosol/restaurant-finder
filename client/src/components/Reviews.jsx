import React from 'react'
import StarRating from './StarRating'

const Reviews = () => {
  return (
    <div className="row col-6 mb-2">
        <div className="card text-white bg-primary mb-3">
        <div className="card-header">Name</div>
        <span><StarRating rating={3}/></span>
            <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Review</p>
            </div>
        </div>
    </div>
  )
}

export default Reviews
