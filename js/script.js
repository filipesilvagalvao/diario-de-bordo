const form = document.querySelector(".logbook__form")

const title = document.querySelector(".logbook__inputTitle")
const date = document.querySelector(".logbook__formDate")
const description = document.querySelector(".logbook__formText")

const postData = (e) => {
    e.preventDefault()

    const logbook = JSON.parse(localStorage.getItem("logbook")) || []

    logbook.push({
        id:crypto.randomUUID(),
        title: title.value,
        date:date.value.replace("-","/").replace("-","/"),
        description:description.value
    })

    localStorage.setItem("logbook",JSON.stringify(logbook))

    form.reset()
}

form.addEventListener("submit", postData)