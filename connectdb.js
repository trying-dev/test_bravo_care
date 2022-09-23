const config = require(`${__dirname}/db-config.json`)["development"]
const db = {}

const Sequelize = require("sequelize")
let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize
db.Sequelize = Sequelize

const db_incoming = require("./test/db")

db.sequelize = db_incoming

module.exports = db
