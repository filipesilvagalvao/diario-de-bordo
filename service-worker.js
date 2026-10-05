const CACHE_NAME = "diario-de-bordo-v2"

const URLS_CACHE = [
    "/",
    "/index.html",
    "/app.js",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "/icons/favicon.ico"
]

self.addEventListener("install", (event) => {
    console.log("Service Worker foi instalado.")
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_CACHE))
    )
})

self.addEventListener("activate", (event) => {
    console.log("Service Worker foi ativado.")

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
})

