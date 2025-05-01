import { scheduleCancel } from "../../services/schedule-cancel.js"
import { schedulesDay } from "./load.js"

const periods = document.querySelectorAll(".period")

// gera evento de click para cada lista (manha, tarde e noite)
periods.forEach((period) => {

    // captura evento de clique na lista
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")){

            // obtem a li pai do elemento clicado
            const item = event.target.closest("li") 
            
            // pega o id do agendamento para remover
            const { id } = item.dataset

            // confirma que o id foi selecionado
            if(id){
                // confirma se o usuario quer cancelar
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

                // faz a requisiçao na api para cancelar
                if(isConfirm){
                    await scheduleCancel({ id }),

                    // recarrega os agendamentos
                    schedulesDay()
                }
            }
        }
    })
});