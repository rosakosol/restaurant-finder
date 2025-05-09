import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const navigate = useNavigate();

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

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`)
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err)
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
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} className="table-primary" key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td><div className="d-flex align-items-center">
                            <StarRating rating={restaurant.average_rating}/>
                            <p className="mb-0 ms-2">({restaurant?.count})</p>
                        </div></td>
                        <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    )
                })}
        </tbody>
        </table>
    </div>
  )
}

export default RestaurantList
