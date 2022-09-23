
const { Sequelize } = require("sequelize")


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ".database/database.sqlite",

  logging: console.log,
  
  define: {
    timestamps: false,
  },
})

module.exports = sequelize