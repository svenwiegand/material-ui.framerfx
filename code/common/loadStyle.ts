export function loadStyle(id: string, href: string) {
    const isLoaded = document.getElementById(id)
    if (!isLoaded) {
        const link = document.createElement("link")
        link.id = id
        link.href = href
        link.rel = "stylesheet"
        document.head.appendChild(link)
    }
}