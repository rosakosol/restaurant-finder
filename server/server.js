require("dotenv").config();

const morgan = require("morgan");

// Creates express instance
const express = require("express")

// Stores instance in app
const app = express()


app.use(express.json());

// Express middleware
app.use(morgan("dev"));

// Get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("Route handler ran");
    res.json({
        status: "success",
        data: {
            restaurant: ["Tottis", "Wendys"],
        },
    });
});

// Get restaurant by id
app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params);
    res.status(200).json ({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }

    });
});

// Create restaurant
app.post("/api/v1/restaurants/", (req, res) => {
    console.log(req.body);
    res.status(201).json ({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }

    });
})

// Update restaurant info
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json ({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }

    });
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json ({
        status: "success",
    });
});

// Store port in const from env variable
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})