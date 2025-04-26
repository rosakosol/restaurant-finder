import React, { useContext, useEffect } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'

const RestaurantDetailPage = () => {
    const {id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await RestaurantFinder.get(`/${id}`);
          setSelectedRestaurant(response.data.data.restaurants)
        }
        catch (err) {

        }
      }
      fetchData();
    }, []);

  return (
    <div>
      <h1>{selectedRestaurant && (
        <>
          <div className="mt-3">
            <Reviews/>
          </div>
        </>
      )}</h1>

    </div>
  )
}

export default RestaurantDetailPage
