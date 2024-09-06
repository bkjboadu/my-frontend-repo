const express = require('express')
const path = require('path')
const app = express()

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// Handle every other route with index.html, which will allow Vue Router to work
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Listen on port 8080 or the port defined by Heroku
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
