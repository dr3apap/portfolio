(function(window, document){
    const root = document.querySelector("html");
   const menuControl = document.querySelector("div [aria-controls]");
    const bar = document.querySelector("[aria-expanded]");
    const navBar = document.querySelector("nav ul");
    const schemeSettings = document.querySelectorAll("[data-scheme]");

function getColorScheme(mode){
    return getComputedStyle(document.documentElement).getPropertyValue(mode); 
}
function setColorScheme(mode, hue){
    root.style.setProperty(mode, hue);

}



schemeSettings.forEach((el, i) => el.addEventListener("click", (e) => {
    e.currentTarget.dataset.scheme = "false";
    schemeSettings[i == 0?1:0].dataset.scheme = "true";
    colorScheme();
}));

function colorScheme(){
    let toggleMode = getComputedStyle(document.documentElement).getPropertyValue("--on");
    switch(toggleMode){
        case "1":
            setColorScheme("--on", 0);
            setColorScheme("--dark-mode", "initial");
            break;
        default:
            setColorScheme("--on", 1);
            setColorScheme("--dark-mode", getColorScheme("--FOOTER-DARK"));
    }
}

    function toggleNav(e) {
        let barState = e.currentTarget.firstElementChild.getAttribute("aria-expanded") == "true" || false;
        bar.setAttribute("aria-expanded", !barState);
        navBar.classList.toggle("show");
        
    }

    menuControl.addEventListener("click", toggleNav);
})(window, document);