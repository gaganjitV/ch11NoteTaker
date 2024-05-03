const express = require("express")  // Import Express.js
const path = require('path'); // Import built-in Node.js package 'path' to resolve path of files that are located on the server
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const PORT =   process.env.PORT || 3001; // Set the port for the server to listen on
const app = express() // Create an instance of the Express.js server


app.use(express.static('public'));
app.use(express.json());

// // GET route for homepage
// app.get('/', (req, res) =>
// res.sendFile(path.join(__dirname, '/public/index.html'))
// );



// // GET route for notes entry page
// app.get('/notes', (req, res) =>
// res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);





app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});