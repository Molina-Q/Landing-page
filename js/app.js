function toggleMenuBurgerIconById(){
    document.getElementById("iconBurgerSwap").classList.toggle("fa-xmark");
    document.getElementById("iconBurgerSwap").classList.toggle("fa-bars");
}

function toggleTopnavResponsive() {
    let topnavElement = document.getElementById("navBurger");
    topnavElement.classList.toggle("responsive");
    toggleMenuBurgerIconById();
}

function swapArrowIconById(idArrow) {
    document.getElementById(idArrow).classList.toggle("fa-circle-chevron-down"); /* switch l'icon de flèche vers le haut/bas  */
    document.getElementById(idArrow).classList.toggle("fa-circle-chevron-up");
}

function swapArrowIconByClass(classNameArrow) {
    const arrows = document.getElementsByClassName(classNameArrow);
    for (let i = 0; i < arrows.length; i++) {
        const openArrows = arrows[i];
        if (openArrows.classList.contains("fa-circle-chevron-up")) {
            openArrows.classList.toggle("fa-circle-chevron-up"); 
            openArrows.classList.toggle("fa-circle-chevron-down");
        }
    }
}

function togglePricingMenu(pricingDropContentPricingLevel, pricingBoxLevel, idIconPricingArrowLevel) { /* toggle les class show and unfold */
    document.getElementById(pricingDropContentPricingLevel).classList.toggle("show");
    document.getElementById(pricingBoxLevel).classList.toggle("unfold");
    swapArrowIconById(idIconPricingArrowLevel);
}

/* btn menu burger sur la nav */
document.getElementById("iconBurger").addEventListener("click", toggleTopnavResponsive);

/* dropdown menu pricing */
// document.getElementById("pricingDropDownStart").addEventListener("click", () => togglePricingMenu("pricingDropContentStart","pricingStart","pricingArrowStart") );
// document.getElementById("pricingDropDownAdv").addEventListener("click", () => togglePricingMenu("pricingDropContentAdv","pricingAdv","pricingArrowAdv") );
// document.getElementById("pricingDropDownPro").addEventListener("click", () => togglePricingMenu("pricingDropContentPro","pricingPro","pricingArrowPro") );

const pricingLevels = ["Start", "Adv", "Pro"];
pricingLevels.forEach((level) =>
    document.getElementById("pricingDropDown" + level).addEventListener("click", () =>
        togglePricingMenu("pricingDropContent" + level, "pricing" + level, "pricingArrow" + level)
    )
);


/* permet de replier les menu déroulant en cliquant n'importe ou dans la fenetre  */
// window.addEventListener("click", function(event) {
//     if (!event.target.matches('.pricingEventBtn')) {
//       const dropdowns = document.getElementsByClassName("pricingDropdownContent");
//       for (let i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//           swapArrowIcon();
//         }
//       }
//     }
// })

// window.addEventListener("click", function(event) {
//     if (!event.target.matches('.pricingEventBtn')) {
//       const dropdowns = document.getElementsByClassName("pricingBackgroundFold");
//       for (let i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('unfold')) {
//           openDropdown.classList.remove('unfold');
//         }
//       }
//     }
// })

const initDropdownParams = [
    // dropdown content
    {
        dropdownsClassName: "pricingDropdownContent",
        dropdownsClassToRemove: "show",
        swapArrowIcon: "fa-circle-chevron-up"
    },
    // pricing fold
    {
        dropdownsClassName: "pricingBackgroundFold",
        dropdownsClassToRemove: "unfold",
        swapArrowIcon: "fa-circle-chevron-down"
    }
];  

initDropdownParams.forEach((dropdownParam) => /* dropdownParam as value */
    window.addEventListener("click", function(event) {
        if (!event.target.matches('.pricingEventBtn')) { /* concerne tous les event liés aux boutons .pricingEventBtn */
            const dropdowns = document.getElementsByClassName(dropdownParam.dropdownsClassName);
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains(dropdownParam.dropdownsClassToRemove)) {
                    openDropdown.classList.remove(dropdownParam.dropdownsClassToRemove);
                    swapArrowIconByClass(dropdownParam.swapArrowIcon);
                }
            }
        }
    })
);



 // if (openDropdown.classList.contains(dropdownParam.SwapArrowIconPosition)) {
                    //     openDropdown.classList.replace("fa-circle-chevron-down")
                    // }
// window.onclick = function(event) {
//   if (!event.target.matches('.pricingEventBtn')) {
//     var dropdowns = document.getElementsByClassName("pricingDropdownContent");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
