const btnInstall = document.querySelector(".btn-install")

// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.log("Erro ao registrar o Service Worker:", err))
}

// Instalação da PWA
let deferredPrompt

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()

    deferredPrompt = e

    btnInstall.style.display = "block"
})

btnInstall.addEventListener("click", async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    console.log(`Usuário escolheu: ${outcome}`)

    deferredPrompt = null
    btnInstall.style.display = "none"
})