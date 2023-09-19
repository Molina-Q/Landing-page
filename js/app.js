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



/* config couleurs par défaut
    --color-primary: var(#2394b8);
    --color-primary-gradient: var(rgb(139,195,245));
    --color-secondary: var(#006c8a);
*/
// function toggleColorTheme(themeColor) {
//     document.getElementById("home").classList.toggle(themeColor)
// }

const themeColors = [
    // blue
    {
        name: "Blue",
        primary: "#2394b8",
        primaryGradient: "rgb(139,195,245)",
        secondary: "#006c8a",
        tertiary: "#2db1da"
    },
    // red
    {
        name: "Red",
        primary: "#b82323",
        primaryGradient: "rgb(245, 139, 139)",
        secondary: "#7c1818",
        tertiary: "#e02a2a"
    },
    // green
    {
        name: "Green",
        primary: "#23b823",
        primaryGradient: "rgb(181, 245, 139)",
        secondary: "#126112",
        tertiary: "#2ce42c"
    },
    // purple
    {
        name: "Purple",
        primary: "#8e23b8",
        primaryGradient: "rgb(220, 139, 245)",
        secondary: "#45115a",
        tertiary: "#ad2ae0"
    }
];


function setColorTheme(themeColor) {
    // console.log("themeColor = ", themeColor);
    const rootElement = document.querySelector(":root"); // équivalent à : document.documentElement
    // console.log("rootElement = ", rootElement);
    
    // const rootComputedStyle = getComputedStyle(rootElement);
    // console.log(rootComputedStyle.getPropertyValue("--color-primary"));
    
    rootElement.style.setProperty("--color-primary", `${themeColor.primary}`); // interpolation 
    rootElement.style.setProperty("--color-primary-gradient", `${themeColor.primaryGradient}`);
    rootElement.style.setProperty("--color-secondary", `${themeColor.secondary}`);
    rootElement.style.setProperty("--color-tertiary", `${themeColor.tertiary}`);

    // `${}` permet de selectionner n'importe quel élément en dehors de la fonction

    // console.log(rootComputedStyle.getPropertyValue("--color-primary"));
}


themeColors.forEach((themeColor) =>
    document.getElementById("gearTheme" + themeColor.name).addEventListener("click", () =>
        setColorTheme(themeColor)
    )
);


// function toggleColorTheme(themeColor) {
//     const toggleColorThemeNow = document.getElementsByClassName("themeColorChangeBackImg");

//     for (let i = 0; i < toggleColorThemeNow.length; i++) {
//         const openColorThemeNow = toggleColorThemeNow[i];
//         openColorThemeNow.classList.toggle(themeColor);
//     }
// }


/* btn menu burger sur la nav */
document.getElementById("iconBurger").addEventListener("click", toggleTopnavResponsive);

/* change la couleur en fonction du clique sur les carrés de gear */
// const mainThemeColor = ["Red", "Green", "Purple"];
// mainThemeColor.forEach((colorChoice) =>
//     document.getElementById("gearTheme" + colorChoice).addEventListener("click", () =>
//         toggleColorTheme("themeIs" + colorChoice)
//     )
// );



const pricingLevels = ["Start", "Adv", "Pro"];
pricingLevels.forEach((level) =>
    document.getElementById("pricingDropDown" + level).addEventListener("click", () =>
        togglePricingMenu("pricingDropContent" + level, "pricing" + level, "pricingArrow" + level)
    )
);

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



