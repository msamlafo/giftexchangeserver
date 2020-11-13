require("dotenv").config();
let express = require('express');
let app = express();
let giftexchange = require('./controllers/giftexchangecontroller')
let user = require('./controllers/usercontroller')
let contact = require('./controllers/contactcontroller');


let port = 3000;
let sequelize = require('./db');

sequelize.sync();
// sequelize.snyc({force:true})
app.use(require('./middleware/headers'))

app.use(express.json());
app.use('/contact', contact)

app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
})

app.use('/user', user);

//app.use(require('./middleware/validate-session'));   <-- This can only be used if all the routes in giftexchange need to be protected/validated. If only a specific number of routes within the giftexchange controller need to be restricted, then you will need to import the validate-session into the giftchange route and incorporate it into only the needed routes. See details in giftexchangecontroller.
app.use('/giftexchange', giftexchange);

app.listen(port, function() {
    console.log(`app is listening at http://localhost:${port}`);
})


