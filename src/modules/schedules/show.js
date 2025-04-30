import dayjs from "dayjs";

// seleciona as sessoes manha, tarde e noite
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function scheduleShow({ dailySchedules }){
    try {
        // limpa as listas
        periodAfternoon.innerHTML = ""
        periodMorning.innerHTML = ""
        periodNight.innerHTML = ""

        // renderiza os agendamentos por periodo
        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li")
            const time = document.createElement("strong")
            const name = document.createElement("span")

            // adiciona o ID do agendamento
            item.setAttribute("data-id", schedule.id)

            time.textContent = dayjs(schedule.when).format("HH:mm")
            name.textContent = schedule.name

            // cria icone de cancelar o agendamento
            const cancelIcon = document.createElement("img")
            cancelIcon.classList.add("cancel-icon")
            cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
            cancelIcon.setAttribute("alt", "Cancelar")

            // adiona o tempo, nome e icone no item
            item.append(time, name, cancelIcon)

            // obtem somente a hora
            const hour = dayjs(schedule.when).hour()

            // renderiza o agendamento na sessao (manha, tarde ou noite)
            if(hour <= 12){
                periodMorning.append(item)
            }else if(hour > 12 && hour <= 18){
                periodAfternoon.append(item)
            }else{
                periodNight.append(item)
            }
        });
    } catch (error) {
        console.log(error)
        alert("Não foi possível exibir os agendamentos!")
    }
}