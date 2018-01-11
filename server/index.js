const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
});

app.post('/login', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, { 
        headers: { 
            Authorization: 'Bearer ' + process.env.AUTH0_MANAGMENT_TOCKEN 
        } 
    }).then ( response => {
        const userData = response.data;
        req.session.user = {
            name: userData.name,
            email: userData.email,
            auth0_id: userData.user_id,
            pictureUrl: userData.picture 
        };
        res.json({ user: req.session.user });
    }).catch(error => {
        res.status(500).json({ message: 'Oh noes!'});
    });
});

app.get('/user-data', (req, res) => {
    res.json({ user: req.session.user })
})

  const PORT = process.env.SERVER_PORT || 3035;
app.listen(PORT, () => {
    console.log(`Am I on?? Yup, on ${PORT}. `); 
} );