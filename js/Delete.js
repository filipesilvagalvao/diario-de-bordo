import { Render_Cards } from "./Render_Cards"
const Delete = (e) =>{
    const logbook = JSON.parse(localStorage.getItem("logbook")) || []

    if(logbook?.length > 0){
        const flogbook = logbook.filter((lb)=>{
           return lb.id !== e.target.parentElement.dataset.id
        })

        localStorage.setItem("logbook", JSON.stringify(flogbook))
        
        Render_Cards()
    }
}

export {Delete}