const Sequelize = require('sequelize');
const sequelize = new Sequelize('giftexchange-walkthrough', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log('Connected to giftexchange-walkthrough postgres database');
    },
    )
        .catch(function(err){
            console.log(err);
        })
module.exports = sequelize;