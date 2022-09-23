const db = require("./db")

const sync = () =>
  new Promise(async (resolve, reject) => {
    try {
      db.sync({ force: true })
      console.log("\n", "\x1b[32m", "Sync made it", "\x1b[36m", "\n")
      resolve()
    } catch (error) {
      console.log("\n", "\x1b[32m", "failed to sync modules", "\x1b[36m", "\n")
      console.log(error)
      reject()
    }
  })

module.exports = sync
