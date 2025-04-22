import React from 'react'

const RestaurantList = () => {
  return (
    <div>
      <table class="table">
        <thead class="table-dark">
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
            <tr class="table-primary">
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
        </table>
    </div>
  )
}

export default RestaurantList
