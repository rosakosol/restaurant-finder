import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
    // Check if reviews is an array and not undefined
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return <p>No reviews available.</p>;  // Fallback message
    }
  
    return (
      <div className="row">
        {reviews.map((review) => (
          <div className="col-6 mb-2" key={review.id}>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">{review.name}</div>
              <span><StarRating rating={review.rating} /></span>
              <div className="card-body">
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default Reviews
