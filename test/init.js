const db = require("./db")

const test_connection = require("./test_connection")

const sync = require("./sync")

const bulk = require("./bulk") // bulk notas

// test_connection()

// sync()

// bulk()

const make_init = () => {
  setTimeout(() => {
    test_connection()
  }, 100)

  setTimeout(() => {
    sync()
  }, 200)

  setTimeout(() => {
    bulk()
  }, 300)
}

module.exports = { make_init }
