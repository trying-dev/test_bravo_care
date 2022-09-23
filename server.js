// const { sequelize } = require("./connectdb.js")

const sequelize = require("./test/db")
const { make_init } = require("./test/init")

const express = require("express")

const bodyParser = require("body-parser")

const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.use(bodyParser.json({ limit: "30mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }))

app.set("port", process.env.PORT || 3001)

const { Facility, CWH, Nurses, Jobs, NHJ } = require("./test/Models")

make_init()

// TODO: Implement Question #1 endpoint here
app.get("/facilities", async (req, res) => {
  const facilities = await Facility.findAll({ raw: true })
  res.send(facilities)
})

// TODO: Implement Question #2 endpoint here
app.post("/hiring_priorities", async (req, res) => {
  const facility_id = req.body.facility_id

  const cwh = await CWH.findAll({
    where: {
      facility_id,
    },
    raw: true,
  })

  let nurses_first_priority = []
  let nurses_second_priority = []
  let nurses_third_priority = []

  cwh.forEach((nurse) => {
    let nurse_priority_scores = 0

    const { worked_shift, call_out, no_call_no_show } = nurse

    if (worked_shift) {
      nurse_priority_scores++
      nurses_first_priority = [nurse, ...nurses_first_priority]
    }
    if (call_out) {
      nurse_priority_scores -= 3
      nurses_second_priority = [nurse, ...nurses_second_priority]
    }
    if (no_call_no_show) {
      nurse_priority_scores -= 5
      nurses_third_priority = [nurse, ...nurses_third_priority]
    }
  })

  nurses_first_priority = nurses_first_priority.sort(
    (a, b) => b.nurse_id - a.nurse_id
  )
  nurses_second_priority = nurses_second_priority.sort(
    (a, b) => b.nurse_id - a.nurse_id
  )
  nurses_third_priority = nurses_third_priority.sort(
    (a, b) => b.nurse_id - a.nurse_id
  )

  const hiring_priorities = [
    ...nurses_first_priority,
    ...nurses_second_priority,
    ...nurses_third_priority,
  ]

  res.send(hiring_priorities)
})

// TODO: Implement Question #4 endpoint here

// Using the provided tables,

// write a query that will return the number of

// remaining spots

// each job has.

// The remaining number of spots will be equal to

// the total number of nurses needed

// minus the number of nurses that are already hired for that job.

// Order the results by the job_id in ascending order

app.get("/remaining_spots", async (req, res) => {
  const jobs = await Jobs.findAll({ raw: true })
  const nhj = await NHJ.findAll({ raw: true })

  let nurses_info = []

  // separar los trabajos por id
  jobs.forEach((job) => {
    // por cada job id mirar la nurses hired jobs si coincide con el numero del id del job
    // llevar la cuenta
    let nurses_hired = 0

    nhj.forEach((nhj_item) => {
      if (job.job_id === nhj_item.job_id) nurses_hired++
    })

    const info_nurses = {
      job_id: job.job_id,
      nurses_needed: job.total_number_nurses_needed,
      nurses_hired,
      remaining_spots: job.total_number_nurses_needed - nurses_hired,
    }

    nurses_info = [info_nurses, ...nurses_info]
  })

  const remaining_spots = nurses_info.filter(
    (nurse_info) => nurse_info.remaining_spots
  )

  //
  res.send(remaining_spots)
})

// TODO: Implement Question #5 endpoint here
// Using the same tables,
// write a query that will return

// the nurse’s ID,
// nurse’s name,
// the nurse type,
// and the total number of jobs
// that each nurse can possibly still get hired for.

// Each nurse can only be hired one time
// for each matching job
// and if the nurse is already hired for a job,
// that job should not count towards the total.
// If a job_id is already completely filled,
// that job should also not count towards the total.

// Order the results by the nurse_id in ascending order.
app.get("/possibly_hired", async (req, res) => {
  //
  const nurses = await Nurses.findAll({ raw: true })
  const nhj = await NHJ.findAll({ raw: true })

  let total_nurses = []

  nurses.forEach((nurse) => {
    let total_number_of_jobs = 0

    nhj.forEach((nhj_item) => {
      if (nurse.nurse_id === nhj_item.nurse_id) total_number_of_jobs++
    })

    const nuerse_info = {
      ...nurse,
      hired: total_number_of_jobs !== 0,
      total_number_of_jobs,
    }

    total_nurses = [...total_nurses, nuerse_info]
  })

  const nurses_information = {
    hired: total_nurses.filter((nurse) => nurse.hired),
    available: total_nurses.filter((nurse) => !nurse.hired),
  }

  // res.send(nurses_information)
  res.send(nurses_information.available)
})

// TODO: Implement Question #6 endpoint here
// Using the same tables,

// write a query that will return
// the name of each facility
// and the name of the nurse that
// has been hired for
// the most number of shifts
// at each of those facilities.

// Order the results by the facility_name in ascending order
app.get("/faility_nurse_most_hired", async (req, res) => {
  const facilities = await Facility.findAll({ raw: true })
  const jobs = await Jobs.findAll({ raw: true })
  const nhj = await NHJ.findAll({ raw: true })
  const nurses = await Nurses.findAll({ raw: true })

  const facilites_filtered = {}

  facilities.forEach((facility) => {
    let list_jobs = []
    let list_etwas = []
    jobs.forEach((job) => {
      if (facility.facility_id === job.facility_id) {
        const nurse_job = nhj.find((nhj_item) => nhj_item.job_id === job.job_id)
        const nurse = nurses.find(
          (nurse_find) => nurse_find.nurse_id === nurse_job.nurse_id
        )

        list_jobs = [...list_jobs, job]
        list_etwas = [
          {
            job,
            nurse_job,
            nurse,
          },
          ...list_etwas,
        ]
      }
    })
    facilites_filtered[facility.facility_name] = list_etwas
  })

  // console.log("Facility A", facilites_filtered["Facility A"])
  // console.log("Facility B", facilites_filtered["Facility B"])
  // console.log("Facility C", facilites_filtered["Facility C"])

  const facilities_keys = Object.keys(facilites_filtered)

  let faility_nurse_most_hired = {}

  facilities_keys.forEach((facility_key) => {
    const facility_array = facilites_filtered[facility_key]
    let persons = []

    facility_array.forEach((facility_item) => {
      const index_person = persons.findIndex(
        (person) => person.name === facility_item.nurse.nurse_name
      )

      if (index_person !== -1) {
        persons[index_person].times++
      } else {
        persons = [
          {
            name: facility_item.nurse.nurse_name,
            times: 1,
          },
          ...persons,
        ]
      }
    })

    faility_nurse_most_hired[facility_key] = persons.sort(
      (a, b) => b.times - a.times
    )[0]
  })

  res.send(faility_nurse_most_hired)
})

// App listen

app.listen(app.get("port"), async () => {
  console.log(`Server is ready`) // eslint-disable-line no-console

  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    console.log(`http://localhost:${app.get("port")}`)
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
})
