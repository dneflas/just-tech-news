const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js')

// create a User model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is equivalent to SQL's NOT NULL option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto_increment 
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is false, we can run our values through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password length must be 4 characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE(https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        //make it so our model stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;