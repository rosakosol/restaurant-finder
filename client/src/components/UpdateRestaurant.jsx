import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
    const {id} = useParams()
    const {restaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await RestaurantFinder.get(`/${id}`)
          const restaurant = response.data?.data?.restaurants;
    
          if (restaurant) {
            setName(restaurant.name);
            setLocation(restaurant.location);
            setPriceRange(restaurant.price_range);
          } else {
            console.warn("No restaurant found for ID:", id);
          }
        } catch (err) {
          console.error("Error fetching restaurant:", err);
        } finally {
          setLoading(false)
        }
      }
    
      fetchData();
    }, [])

    if (loading) return <div>Loading...</div>
    

    const handleSubmit = async (e) => {
      e.preventDefault()

      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate(`/`)
    } 

  return (
    <div>
      <h1>{name}</h1>

      <form action="">
        <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="location">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
        </div>
        <div className="form-group">
            <label className="form-label" htmlFor="price_range">Price Range</label>
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
