module.exports = (sequelize, DataTypes) =>{
    const Giftexchange = sequelize.define('giftexchange', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,   
        },
        gift:{
            type: DataTypes.STRING,
            allowNull: false
        },
        season:{
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    });
    return Giftexchange;
}
