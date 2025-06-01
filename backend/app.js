const express = require('express');
const JournalRoutes = require('./routes/journalRoutes.js');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());


app.use('/api/journals', JournalRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
});