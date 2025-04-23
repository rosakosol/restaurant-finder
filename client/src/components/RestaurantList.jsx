import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                console.log(response)
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    },[])

    const handleUpdate = () => {
        console.log("")
    };

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {

        }
    }

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
            <tr>
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return (
                        <tr className="table-primary" key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>Reviews</td>
                        <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    )
                })}
        </tbody>
        </table>
    </div>
  )
}

export default RestaurantList
