const express = require('express');
const app = express();
const knex = require('knex');
const knexConfig = require('./Knexfile'); // Make sure the path is correct
const db = knex(knexConfig.development); // Select the development environment

// Middleware to allow JSON data parsing in requests
app.use(express.json());

// Create Endpoint (Creation)
app.post('/create', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, description } = req.body;

        // Insert the new record into the database
        const [newRecordId] = await db('users').insert({
            name,
            description,
        });

        // Fetch the newly-created record
        const newRecord = await db('users').where('id', newRecordId).first();

        // Return the newly-created record as JSON
        res.json(newRecord);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Read Endpoint (Retrieval)
app.get('/retrieve', async (req, res) => {
    try {
        // Extract the query parameter (e.g., title or name)
        const { queryParam } = req.query;

        // Perform a SELECT query using the provided parameter
        const results = await db('users').where('Name', 'LIKE', `%${queryParam}%`);

        // Return the results as a JSON response
        res.json(results);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Update Endpoint
app.put('/update/:id', async (req, res) => {
    try {
        // Extract the ID parameter from the URL
        const { id } = req.params;

        // Extract the changes from the request body
        const { name, description } = req.body;

        // Perform an UPDATE query to update the record with the provided ID
        await db('users').where('id', id).update({ name, description });

        // Return a success JSON response
        res.json({ success: true });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Delete Endpoint
app.delete('/delete/:id', async (req, res) => {
    try {
        // Extract the ID parameter from the URL
        const { id } = req.params;

        // Perform a DELETE query to delete the record with the provided ID
        await db('users').where('id', id).del();

        // Return a success JSON response
        res.json({ success: true });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

