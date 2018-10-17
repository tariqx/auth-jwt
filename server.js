const express = require("express");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const auth = require('./auth.js')

const app = express();

const port = 3000;

//use static files
//app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.json());

//mock client specific 
let Options = {
    issuer: "http://localhost",
    subject: "", //"tariq@tariq.com",
    audience: "urn:localhost"
}

app.post('/api/login', (req, res) => {

    // payload
    const user = {
        id: req.body.id,//'xyz1',
        username: req.body.username,//'tariq',
        email: req.body.email //'tariq@localhost.com'
    }
    Options.subject = user.username; //pass in current username

    auth.JWTSign(user, Options, (err, token) => {
        if (err) {
            res.json({
                msg: err.message
            })

        } else if (token) {
            res.json({
                token: token
            })
        }
    })

})

//add a new student
app.post('/api/student/', (req, res) => {

    const header = req.headers['authorization'].split(' ');

    auth.JWTVerify(header[1], (err, data) => {
        if (err) {
            res.json({
                msg: err.message
            })
        } else if (data) {
            res.json({
                msg: 'new student created',
                verified: data
            })
        }
    })

})

app.listen(port, () => {
    console.log('server started on port ' + port);

})
