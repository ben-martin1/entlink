const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// API Endpoint for A4 Pipe Spike
app.post('/cs361/a4/', (req, res) => {
    console.log(req.body.message);
    data = { message: "This is a message from CS361" };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});