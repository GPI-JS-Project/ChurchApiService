// index.js
require('@babel/register')({
    presets: ['@babel/preset-env']
});
const express = require('express');
const app = express();
const routes = require('./Routes/routes');
const cors = require("cors");
app.use(cors());
app.use(express.json());

// const schedule = require('node-schedule');
// schedule.scheduleJob('* * * * *', (fireDate) => {
//     console.log("------Schedule start----- at " + fireDate + "but actually in " + new Date());
// });
const admin = require("firebase-admin");
const serviceAccount = {
    "type": "service_account",
    "project_id": "mosfraamtech-1558316179266",
    "private_key_id": "708de1d4fc72b9f6f9cffb6c209fce5721094f26",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9Paf/6Iy2Ixlp\nCxSRN7AZvwTPvDd8eC3I185D1sCOF/DoY/46ayIqsFJuxguggkMbpcfamK4xFiFt\nBgNpzxNuuImK4nfvO7stBzdxSS79Gp9mRIKjH5dqpjZivvgPCiGMYvPvF0QMsUrV\nNT9T0qpAVqxXIAxKjcOMOcvCkVj1NuSlOFyexgaM4rXdlr+F3JidJDn1YdenUqe4\nHzneXMP0skcNjwDNy1OaSlFdnj8J1w69E75+D5ddBsynbti3wnif9ZNEi4euppM+\nhxmSPW8x6SePaeklvf4IXAXHAkwWickG+HskzB6oIyvAzkwiM9whkWKyC0kAiZX3\n7tKSC/xJAgMBAAECggEAGx840oHRFvKZW/d5U2XEkLASn7ZFSorL3w7k8k6XStYu\nEhRwtY0wuKcMLXGnbXH17cK5DcCXqJPYJxC3UQUbbyE2H0hdcZVhOm8gGFWpjR9x\nbH4RrhDjSeb4APeHRFqKm9z7wo7WUy5ewAdxY9Fb0rxJV3RRpqbCObj31dMwiXY8\nzj6Nm4hmBhPFv52Uw5dWKlAu6tMu7WvhH6NJuqszPF2ELJv7SMc3oiISoKYlDPsj\nvUfjmDa8rmiNqZvQmP9MOXAvVEZxrxJfQRQf2ywqNRfBu0YA4PQzUczUi0MpjTij\nJyu2TpF4traKSGvlKKStGxlu3IRJcna0coCY0HreTQKBgQD30U5NkRWpi0BWT0Yq\nQxSEjVFQHh6vBj1EClQTgHwQ01By0v6shwGVdL2ZTyPFiL0bTi17Zm7TvCaLNB+m\n+lpHMjFEppBeVNG8XlX8GLKahF+E6Pnv4Q4XYJp80wqjW3UOZKdiXgH3omIfRIhD\nOQkD9WCL1n1SPKwMIbddbm75nQKBgQDDfToCPcKG+tb1uIKgashNlFzRWhq2ThVh\nnuMvho0QN+GSimc7QY/VwO6XdBWuEa8uFNofk35DGmudnaaVAEl2uaP9Kpwakkgs\nhPH5R117S3DaBlkvL9I6ZX6uu5krvgM22q8WI4Y0ZlGVHbpLwLfxpEvEs0f5UfuW\n7VyeN5tTnQKBgAaTZDuErQl5q3Re2CLI8uNtiInSsse8J6YFjCOUVjZwFQNm++EC\nGBWqKlnGEtHsBfCSi3xpxGkT5gXtlSVuITUgbNRAgzYtk/8mlauB0ENvXcV+FRu7\nYg9WveKwCuk4xQtjullO20iB446m1+LIwad8PFqZj2u+NmaAAoiVJJa1AoGABnnQ\ngSCAoC4RDuTE1wGSjxdaF8lPVziw9qHnzrw7Ug032L3i+5CJbkBM5xF+YlzNm84v\nB5rANQLcC8WcLhVrWZZ+uzU9JJgx8d+ZkHNvwlTWcTKCo9CGu05/atRmF4/c1WVb\nJXWZzYSSMUlh0X6Z2VRi+ioiOT0hA3freIZJC/UCgYAg9iELrcsclUs7uXRcNWqL\nH4sk3kftMS97P9FuH1OxANI0oNLHLuE/olVEAaAq5b4gc4BJmhmUj79YlkEd9Z50\nt9T5MNqDSzygWiJHgz6XhxmppNAHgmxjXqJ67SBxspjwkpj3Xj8oNM4gDHt2OnaD\n4lQgB2IFzxAL3txCkYqhFw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-8er5b@mosfraamtech-1558316179266.iam.gserviceaccount.com",
    "client_id": "100449311974729456273",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8er5b%40mosfraamtech-1558316179266.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use('/api/v1', routes);


// Define a middleware to handle "Not Found" errors and respond with JSON

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The requested URL ${req.url} was not found`
    });
});





const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});