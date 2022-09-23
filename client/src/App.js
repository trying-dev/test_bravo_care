import React, { Component, useEffect, useRef, useState } from "react"
import Client from "./Client"
import "./App.css"

const get_facilities_options = async () => {
  try {
    const response = await fetch("http://localhost:3001/facilities")

    const facilities = await response.json()

    const facilities_options_creation = facilities.map((facility) => {
      return (
        <option key={facility.facility_id} value={facility.facility_id}>
          {facility.facility_name}
        </option>
      )
    })

    return facilities_options_creation
  } catch (error) {
    console.error(error)
  }
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const QuestionThreeAnswer = () => {
  const [facility_options, set_facility_options] = useState()
  const [nurses_options, set_nurses_options] = useState()
  const ref_select = useRef()

  useEffect(() => {
    const run_it = async () => {
      const facility_options = await get_facilities_options()
      set_facility_options(facility_options)
    }

    run_it()
  }, [])

  const request_hiring = async () => {
    const hiring_priority = await postData(
      "http://localhost:3001/hiring_priorities",
      {
        facility_id: ref_select.current.value,
      }
    )

    const hiring_priority_options = hiring_priority.map((nurse) => (
      <div key={nurse.id}>{nurse.nurse_id}</div>
    ))

    set_nurses_options(hiring_priority_options)
  }

  return (
    <div className="question-box">
      <h1>Questions #1</h1>

      <div>
        <div>
          <select name="cars" id="cars" ref={ref_select}>
            {facility_options}
          </select>

          <button onClick={request_hiring}>submit</button>
        </div>

        <div className="nurse-options">{nurses_options}</div>
      </div>
    </div>
  )
}

/* For Questions #4, #5, and #6 you will need to add three buttons [ “Execute Q4 Query”, “Execute Q5 Query”, “Execute Q6 Query” ] which will each be responsible for executing their respective queries and the results of the query should be logged into the console.*/

const get = async (url) => {
  try {
    const response = await fetch(`http://localhost:3001/${url}`)

    return response.json()
  } catch (error) {
    console.error(error)
  }
}
const QuestionsFourFiveSix = () => {
  // remaining_spots
  const request_remaining_spots = async () => {
    const remaining_spots = await get("remaining_spots")
    console.log("\n\n", "remaining_spots : \n\n", remaining_spots, "\n\n")
  }
  // possibly_hired
  const request_possibly_hired = async () => {
    const possibly_hired = await get("possibly_hired")
    console.log("\n\n", "possibly_hired : \n\n", possibly_hired, "\n\n")
  }
  // faility_nurse_most_hired
  const request_faility_nurse_most_hired = async () => {
    const faility_nurse_most_hired = await get("faility_nurse_most_hired")
    console.log(
      "\n\n",
      "faility_nurse_most_hired : \n\n",
      faility_nurse_most_hired,
      "\n\n"
    )
  }
  return (
    <div className="question-box">
      <h1>Questions #4, #5, #6</h1>

      <button onClick={request_remaining_spots}>Questions #4</button>

      <button onClick={request_possibly_hired}>Questions #5</button>

      <button onClick={request_faility_nurse_most_hired}>Questions #6</button>
    </div>
  )
}

const App2 = () => {
  return (
    <main>
      <QuestionThreeAnswer />
      <QuestionsFourFiveSix />
    </main>
  )
}

class App extends Component {
  renderQuestionThreeAnswer() {
    let facilities = []
    let facility_options

    fetch("http://localhost:3001/facilities")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        facilities = response.json()
        return response.json()
      })
      .then((facilities) => {
        facility_options = facilities.map((facility) => {
          return (
            <option value={facility.facility_id}>
              {facility.facility_name}
            </option>
          )
        })

        console.log(facility_options)
      })

    console.log(facility_options)

    return (
      <div className="question-box">
        <h1>Questions #1</h1>

        <div>
          <div>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

            <button type="submit"></button>
          </div>

          <div>
            <button>3</button>
            <button>1</button>
            <button>2</button>
          </div>
        </div>
      </div>
    )
  }

  /* For Questions #4, #5, and #6 you will need to add three buttons [ “Execute Q4 Query”, “Execute Q5 Query”, “Execute Q6 Query” ] which will each be responsible for executing their respective queries and the results of the query should be logged into the console.*/
  renderQuestionsFourFiveSix() {
    return (
      <div className="question-box">
        <h1>Questions #4, #5, #6</h1>
      </div>
    )
  }

  render() {
    return (
      <main>
        {this.renderQuestionThreeAnswer()}
        {this.renderQuestionsFourFiveSix()}
      </main>
    )
  }
}

export default App2
