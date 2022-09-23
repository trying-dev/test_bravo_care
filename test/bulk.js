const db = require("./db")

const facilities = [
  { facility_id: 100, facility_name: "Facility A" },
  { facility_id: 101, facility_name: "Facility B" },
  { facility_id: 102, facility_name: "Facility C" },
]

const clinician_work_history = [
  {
    facility_id: 100,
    nurse_id: 1,
    worked_shift: true,
    call_out: false,
    no_call_no_show: false,
  },
  {
    facility_id: 100,
    nurse_id: 2,
    worked_shift: true,
    call_out: false,
    no_call_no_show: false,
  },
  {
    facility_id: 101,
    nurse_id: 2,
    worked_shift: true,
    call_out: false,
    no_call_no_show: false,
  },
  {
    facility_id: 100,
    nurse_id: 3,
    worked_shift: true,
    call_out: false,
    no_call_no_show: false,
  },
  {
    facility_id: 102,
    nurse_id: 2,
    worked_shift: false,
    call_out: false,
    no_call_no_show: true,
  },
]

const nurses = [
  {
    nurse_id: 1000,
    nurse_name: "Kevin",
    nurse_type: "CNA",
  },
  {
    nurse_id: 1001,
    nurse_name: "Anne",
    nurse_type: "CNA",
  },
  {
    nurse_id: 1002,
    nurse_name: "Abby",
    nurse_type: "RN",
  },
  {
    nurse_id: 1003,
    nurse_name: "John",
    nurse_type: "LPN",
  },
  {
    nurse_id: 1004,
    nurse_name: "Thomas",
    nurse_type: "LPN",
  },
  {
    nurse_id: 1005,
    nurse_name: "Sam",
    nurse_type: "CNA",
  },
  {
    nurse_id: 1006,
    nurse_name: "Wesley",
    nurse_type: "RN",
  },
  {
    nurse_id: 1007,
    nurse_name: "Adam",
    nurse_type: "CNA",
  },
  {
    nurse_id: 1008,
    nurse_name: "Cory",
    nurse_type: "RN",
  },
  {
    nurse_id: 1009,
    nurse_name: "Robert",
    nurse_type: "LPN",
  },
  {
    nurse_id: 1010,
    nurse_name: "Mark",
    nurse_type: "LPN",
  },
]

const jobs = [
  {
    job_id: 200,
    facility_id: 100,
    nurse_type_needed: "RN",
    total_number_nurses_needed: 1,
  },
  {
    job_id: 201,
    facility_id: 101,
    nurse_type_needed: "LPN",
    total_number_nurses_needed: 1,
  },
  {
    job_id: 202,
    facility_id: 100,
    nurse_type_needed: "CNA",
    total_number_nurses_needed: 2,
  },
  {
    job_id: 203,
    facility_id: 102,
    nurse_type_needed: "LPN",
    total_number_nurses_needed: 2,
  },
  {
    job_id: 204,
    facility_id: 102,
    nurse_type_needed: "RN",
    total_number_nurses_needed: 2,
  },
  {
    job_id: 205,
    facility_id: 100,
    nurse_type_needed: "RN",
    total_number_nurses_needed: 3,
  },
  {
    job_id: 206,
    facility_id: 101,
    nurse_type_needed: "LPN",
    total_number_nurses_needed: 2,
  },
  {
    job_id: 207,
    facility_id: 101,
    nurse_type_needed: "CNA",
    total_number_nurses_needed: 1,
  },
  {
    job_id: 208,
    facility_id: 100,
    nurse_type_needed: "RN",
    total_number_nurses_needed: 1,
  },
  {
    job_id: 209,
    facility_id: 102,
    nurse_type_needed: "CNA",
    total_number_nurses_needed: 4,
  },
  {
    job_id: 210,
    facility_id: 102,
    nurse_type_needed: "LPN",
    total_number_nurses_needed: 3,
  },
]

const nurse_hired_jobs = [
  { job_id: 200, nurse_id: 1006 },
  { job_id: 201, nurse_id: 1003 },
  { job_id: 202, nurse_id: 1007 },
  { job_id: 206, nurse_id: 1003 },
  { job_id: 203, nurse_id: 1004 },
  { job_id: 204, nurse_id: 1008 },
  { job_id: 205, nurse_id: 1008 },
  { job_id: 206, nurse_id: 1010 },
  { job_id: 207, nurse_id: 1005 },
  { job_id: 208, nurse_id: 1006 },
  { job_id: 209, nurse_id: 1001 },
  { job_id: 204, nurse_id: 1006 },
  { job_id: 210, nurse_id: 1004 },
]

console.log("\n", "\x1b[36m")

const { Facility, CWH, Nurses, Jobs, NHJ } = require("./Models")

const bulk = async () =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("\n", "\x1b[32m", "Bulk ", "\x1b[36m", "\n")

      await Facility.bulkCreate(facilities, { validate: true })

      await CWH.bulkCreate(clinician_work_history, { validate: true })

      await Nurses.bulkCreate(nurses, { validate: true })

      await Jobs.bulkCreate(jobs, { validate: true })

      await NHJ.bulkCreate(nurse_hired_jobs, { validate: true })

      resolve()
    } catch (error) {
      console.log("\n", "\x1b[33m", "failed to Bulk", "\x1b[36m", "\n")
      console.log(error)
      reject()
    }
  })

module.exports = bulk
