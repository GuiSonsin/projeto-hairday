import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

// data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// carrega data atual
selectedDate.value = inputToday

// define a data minima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        // recuperando o nome do cliente
        const name = clientName.value.trim()

        if(!name){
            return alert("Informe o nome do cliente!")
        }

        // recupera o horario selecionado
        const hourSelected = document.querySelector(".hour-selected")
        
        if(!hourSelected){
            return alert("Selecione a hora!")
        }

        // recumera somente a hora
        const [hour] = hourSelected.innerHTML.split(":")
        
        // insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour") 

        // gera um id
        const id = String(new Date().getTime())

        // faz o agendamento
        await scheduleNew({
            id,
            name,
            when,
        })

        // recarrega os agendamentos
        await schedulesDay()

        // limpa o campo input do nome do cliente
        clientName.value = ""

    } catch (error) {
        alert("Não foi possível realizar o agendamento!")
        console.log(error)
    }

}