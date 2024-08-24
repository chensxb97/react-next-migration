const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors());
app.use(express.json())

// Documentation
app.get('/api/documentation/get', async (req, res) => {
    try {
        const filePath = './docs/example.md'
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err)
                return res.status(500).json({ error: 'Failed to read file' })
            }
            res.status(200).json({ content: data })
        })
    } catch (error) {
        console.error('Error processing request:', error)
        res.status(500).json({ error: 'Failed to process request' })
    }
})

// DB Handlers
const pocketBaseUrl = `127.0.0.1:8090`

// Get all users
app.get('/api/users/get', async (req, res) => {
    try {
        const response = await fetch(`http://${pocketBaseUrl}/api/collections/testUsers/records?page=1&perPage=30`, { cache: 'no-store' });
        const data = await response.json()
        res.status(200).json(data?.items)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

// Get a user by id
app.get('/api/users/get/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const response = await fetch(`http://${pocketBaseUrl}/api/collections/testUsers/records/${userId}`, { cache: 'no-store' });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
})

// Create a new user
app.post('/api/users/create', async (req, res) => {
    const { name, email, age, employmentStatus, maritalStatus } = req.body;
    try {
        const response = await fetch(`http://${pocketBaseUrl}/api/collections/testUsers/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                age,
                employmentStatus,
                maritalStatus
            }),
        });
        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Edit an existing user
app.patch('/api/users/edit/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, email, age, employmentStatus, maritalStatus } = req.body;
    try {
        const response = await fetch(`http://${pocketBaseUrl}/api/collections/testUsers/records/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                age,
                employmentStatus,
                maritalStatus
            }),
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete a user
app.delete('/api/users/delete/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        await fetch(`http://${pocketBaseUrl}/api/collections/testUsers/records/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})