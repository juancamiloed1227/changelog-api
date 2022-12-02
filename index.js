const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Use body parser to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS to allow requests from other domains
app.use(cors());

// Mount the API routes
app.use("/api", routes);

// Start the server on port 3000
app.listen(process.env.PORT || 8080, () => {
    console.log("API server listening");
});
