function toggleTopnavResponsive() {
    let topnavElement = document.getElementById("navBurger");
    topnavElement.classList.toggle("responsive");
}


document.getElementById("iconBurger").addEventListener("click", toggleTopnavResponsive);