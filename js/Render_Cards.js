const Delete = (e) => {
    const logbook = JSON.parse(localStorage.getItem("logbook")) || []

    if (logbook?.length > 0) {
        const card = e.target.closest(".logbook__card")
        const flogbook = logbook.filter((lb) => {
            return lb.id !== card.dataset.id
        })

        localStorage.setItem("logbook", JSON.stringify(flogbook))

        Render_Cards()
    }
}

const Render_Cards = () => {
    const logbook__list = document.querySelector(".logbook__list")
    const logbook = JSON.parse(localStorage.getItem("logbook")) || []
    logbook__list.innerHTML = ""

    if (logbook?.length > 0) {
        logbook.forEach(lb => {
            logbook__list.innerHTML += `
            <div class="logbook__card" data-id="${lb.id}">
                <h3>${lb.title}</h3>
                <data value="${lb.date}">${lb.date}</data>
                <p>${lb.description}</p>
                <button class="logbook__cardDelete"><i class="fa-solid fa-trash"></i> Deletar</button>
            </div>
            `
        });

        const cards = document.querySelectorAll(".logbook__card > button")

        cards.forEach((card) => {
            card.addEventListener("click", Delete)
        })
    }



}

export { Render_Cards }