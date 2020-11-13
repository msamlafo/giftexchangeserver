let express = require('express');
let router = express.Router();

router.get('/', (req, res) =>{
    res.send(" 📲 Contacts route is where you will find the contacts of all employees in this company.");
})
module.exports = router;

