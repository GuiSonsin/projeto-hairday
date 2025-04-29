import dayjs from "dayjs"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")

// data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// carrega data atual
selectedDate.value = inputToday

// define a data minima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = (event) => {
    event.preventDefault()

}