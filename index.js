// index.js (ES Module syntax)

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename and __dirname are not directly available in ES modules.
// We derive them here to use with path.join().
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run requires apps to listen on PORT

// Serve static files from the 'dist' directory
// This tells the server to look for your built frontend assets here
app.use(express.static(path.join(__dirname, 'dist')));

// For all other requests, serve index.html (SPA routing)
// Using a regex for the catch-all route to avoid PathError issues with string wildcards
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



