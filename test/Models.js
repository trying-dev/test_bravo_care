// importaciones
const db = require("./db")
const Sequelize = require("sequelize")

// modulo Facility
const Facility = db.define("facilities", {
  facility_id: {
    type: Sequelize.NUMBER,
  },
  facility_name: {
    type: Sequelize.STRING,
  },
})

// modulo clinician_work_history
const clinician_work_history = db.define("clinician_work_history", {
  facility_id: {
    type: Sequelize.NUMBER,
  },
  nurse_id: {
    type: Sequelize.NUMBER,
  },
  worked_shift: {
    type: Sequelize.BOOLEAN,
  },
  call_out: {
    type: Sequelize.BOOLEAN,
  },
  no_call_no_show: {
    type: Sequelize.BOOLEAN,
  },
})

// modulo Nurses
const Nurses = db.define("nurses", {
  nurse_id: {
    type: Sequelize.NUMBER,
  },
  nurse_name: {
    type: Sequelize.STRING,
  },
  nurse_type: {
    type: Sequelize.STRING,
  },
})

// modulo jobs
const Jobs = db.define("jobs", {
  job_id: {
    type: Sequelize.NUMBER,
  },
  facility_id: {
    type: Sequelize.NUMBER,
  },
  nurse_type_needed: {
    type: Sequelize.STRING,
  },
  total_number_nurses_needed: {
    type: Sequelize.NUMBER,
  },
})

// modulo jobs
const nurse_hired_jobs = db.define("nurse_hired_jobs", {
  job_id: {
    type: Sequelize.NUMBER,
  },
  nurse_id: {
    type: Sequelize.NUMBER,
  },
})

module.exports = {
  Facility,
  CWH: clinician_work_history,
  Nurses,
  Jobs,
  NHJ: nurse_hired_jobs,
}
