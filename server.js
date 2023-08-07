const express = require('express');
const path = require('path');

const app = express();
require('dotenv').config({ path: './config/.env' });

// import routes 
const profileRoutes = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const wallPostRoutes = require('./routes/wallPostsRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// import db
const database = require('./database/db');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database();

app.use('/energy', profileRoutes);
app.use('/energy', commentRoutes);
app.use('/energy', postRoutes);
app.use('/energy', wallPostRoutes);
app.use('/energy', authRoutes);

// Serve React client on any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log('server is running on PORT ' + PORT);
});
