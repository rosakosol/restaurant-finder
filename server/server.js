require("dotenv").config();
const db = require("./db")

const morgan = require("morgan");

// Creates express instance
const express = require("express")

const cors = require("cors")

// Stores instance in app
const app = express()

app.use(cors());
app.use(express.json());

// Express middleware
app.use(morgan("dev"));

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query('SELECT * from restaurants');
        console.log(results);
        res.json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    } catch(err) {
        console.log("error");
    }


});

// Get restaurant by id
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        // Get restaurant details
        const restaurant = await db.query("SELECT * from restaurants WHERE id= $1", [req.params.id]);

        // Get reviews
        const reviews = await db.query("SELECT * from reviews WHERE restaurant_id= $1", [req.params.id]);

        res.status(200).json ({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });


    } catch (err) {
        console.log(err);
    }

});

// Create restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json ({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows[0],
            }
    
        }); 
        console.log(req.body);
    } catch (err) {
        console.log(err);
    }

})

// Update restaurant info
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json ({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
    
        });
    } catch(err) {
        console.log(err);
    }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json ({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }    
});

// Store port in const from env variable
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})