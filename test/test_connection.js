const db = require("./db")

const test_connection = async () => new Promise(async (resolve, reject) => {
  try {
    console.log("\n")
    await db.authenticate()
    console.log("\n")
    console.log("Connection has been established successfully.", "\n")
    resolve()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    reject()
  }
})

module.exports = test_connection