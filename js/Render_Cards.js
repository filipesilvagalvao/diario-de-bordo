import { Delete } from "./Delete.js"
const Render_Cards = () => {
    const logbook__list = document.querySelector(".logbook__list")
    const logbook = JSON.parse(localStorage.getItem("logbook")) || []

    if (logbook?.length > 0) {

        logbook__list.innerHTML = ""
        logbook.forEach(lb => {
            logbook__list.innerHTML += `
            <div class="logbook__card" data-id="${lb.id}">
                <h3>${lb.title}</h3>
                <data value="${lb.date}">${lb.date}</data>
                <p>${lb.description}</p>
                <button>Delete</button>
            </div>
            `
        });
    }

    const cards = document.querySelectorAll(".logbook__card > button")

    cards.forEach((card) => {
        card.addEventListener("click", Delete)
    })
}

export { Render_Cards }