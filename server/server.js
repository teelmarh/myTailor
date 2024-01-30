const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const measurementRouter = require('./Api/measurementRoutes')

//route requests
app.use('/form', measurementRouter)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
