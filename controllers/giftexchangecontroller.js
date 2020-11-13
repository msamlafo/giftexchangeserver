let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Giftexchange = require('../db').import('../models/giftexchange');


// get individual gift log by id
router.get('/mine', validateSession, function(req, res){
    let userid = req.user.id;
    Giftexchange.findAll({
        where: { owner: userid }
    })
    .then(giftexchanges => res.status(200).json(giftexchanges))
    .catch(err => res.status(500).json({ error: err}))

})

//allow individual to create a gift log
router.post('/create', validateSession, (req, res) =>{
    const giftEntry = {
        name: req.body.giftexchange.name,
        gift: req.body.giftexchange.gift,
        season: req.body.giftexchange.season.toLowerCase(),
        amount: req.body.giftexchange.amount,
        owner: req.user.id
    }
    Giftexchange.create(giftEntry)
        .then(giftexchange =>res.status(200).json(giftexchange))
        .catch(err => res.status(500).json({ error: err }))
})

//view/get all gift logs
router.get("/", (req,res) => {
    Giftexchange.findAll()
    .then(giftexchanges => res.status(200).json(giftexchanges))
    .catch(err => res.status(500).json({ error:err }))
})



//search and view gift log by season
router.get('/:season', function(req, res) {
    let season = req.params.season.toLowerCase();
    Giftexchange.findAll({
        where: {season: season}
    })
    .then(giftexchanges => res.status(200).json(giftexchanges))
    .catch(err => res.status(500).json({ error:err }))
})


// get individual's log for update by user
router.put("/update/:id", validateSession, function (req, res){
    // const updateGiftexchangeEntry = {
    //     name: req.body.giftexchange.name,
    //     gift: req.body.giftexchange.gift,
    //     season: req.body.giftexchange.season.toLowerCase(),
    //     amount: req.body.giftexchange.amount
    // };
    const query = { where: { id: req.params.id, owner: req.user.id } }

    Giftexchange.update(req.body.giftexchange, query)
    .then((giftexchanges) => res.status(200).json(giftexchanges))
    .catch((err) => res.status(500).json({error:err}));
});

// Allow individuals log to be deleted
router.delete("/delete/:id", validateSession, function (req, res){
    const query = {
        where: { id: req.params.id, owner: req.user.id }
    };
    Giftexchange.destroy(query)
    .then(() => res.status(200).json({ message: "Gift entry removed"}))
    .catch((err) => res.status(500).json({ error: err }));
})



router.get('/', function(req, res){
    res.send('Hey!! This is the giftexchange route!');
})

router.get('/about', function(req, res){
    res.send("hey!! 📣 This is where you can find out all about the giftexchange app!");
})

router.get('/contact', (req, res) =>{
    res.send(" 🔈 Contacts route is where you will find the contacts of all employees in this company.");
})

module.exports = router;