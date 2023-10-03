function toggleMenuBurgerIconById(){
    document.getElementById("iconBurgerSwap").classList.toggle("fa-xmark");
    document.getElementById("iconBurgerSwap").classList.toggle("fa-bars");
}

function toggleTopnavResponsive() {
    let topnavElement = document.getElementById("navBurger");
    topnavElement.classList.toggle("responsive");
    toggleMenuBurgerIconById();
}

function toggleGearMenu() {
    let gearElement = document.getElementById("gearMenu");
    let gearBloc = document.getElementById("gearContent")
    gearElement.classList.toggle("gearMenuShow");
    gearBloc.classList.toggle("gearMenuUnfold")
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

function setColorTheme(themeColor) {
    rootElement.style.setProperty("--color-primary", `rgb(${themeColor.primary})`); // interpolation 
    rootElement.style.setProperty("--color-primary-gradient", `rgb(${themeColor.primaryGradient})`);
    rootElement.style.setProperty("--color-secondary", `rgb(${themeColor.secondary})`);
    rootElement.style.setProperty("--color-tertiary", `rgb(${themeColor.tertiary})`);
    // document.getElementById("gearTheme" + themeColor.name).classList.toggle("selectedGear")
}

/* utilisé pour modifier les valeurs des var du CSS */
const rootElement = document.querySelector(":root"); 

const themeColors = [
    // blue
    {
        name: "Blue",
        primary: "35, 148, 184",
        primaryGradient: "139, 195, 245",
        secondary: "45, 177, 218",
        tertiary: "0, 108, 138"
    },
    // red
    {
        name: "Red",
        primary: "184, 35, 35",
        primaryGradient: "245, 139, 139",
        secondary: "224, 42, 42",
        tertiary: "129, 24, 24"
    },
    // green
    {
        name: "Green",
        primary: "35, 184, 35",
        primaryGradient: "181, 245, 139",
        secondary: "44, 228, 44",
        tertiary: "25, 124, 25"
    },
    // purple
    {
        name: "Purple",
        primary: "142, 35, 184",
        primaryGradient: "220, 139, 245",
        secondary: "173, 42, 224",
        tertiary: "84, 20, 109"
    }
];

themeColors.forEach((themeColor) =>
    document.getElementById("gearTheme" + themeColor.name).addEventListener("click", function(){

    const element = document.querySelector(":root");               // <-- id of the button we're transitioning
    const transitionTime = 600 ;                                // <-- 1000 = 100 ms temps de l'animation
    let intervalFrame;                  // <-- stores the interval frame
    let currentPercent = 0;                 // <-- current percentage through the animation
    let elapsed = 0;                    // <-- number of frames which have ellapsed 

    const rootComputedStyle = getComputedStyle(rootElement);

    /* array qui stock les valeurs RGB du gradient en string AVANT que setColorTheme soit appelé */
    const themeActualPrimary= rootComputedStyle.getPropertyValue("--color-primary") ;
    const themeActualGradient= rootComputedStyle.getPropertyValue("--color-primary-gradient") ;

    /* stock individuellement chaque element du string "r, g, b" crée au dessus dans un array ce qui donne : ["r", "g", "b"] */
    const rgbActualPrimary = themeActualPrimary.match(/\d+/g) ;
    const rgbActualGradient = themeActualGradient.match(/\d+/g) ;

    const ArrayActualPrimary = [] ; 
    const ArrayActualGradient = [] ;
    
    /* converti en int et stock les valeurs "r", "g" et "b" dans un array */
    for(let i = 0; i < rgbActualPrimary.length; i++) {
        ArrayActualPrimary.push(parseInt(rgbActualPrimary[i])) ; 
    }
    
    for(let i = 0; i < rgbActualGradient.length; i++) {
        ArrayActualGradient.push(parseInt(rgbActualGradient[i])) ;
    }

    setColorTheme(themeColor) ;

    /* array qui stock les valeurs RGB du gradient en string APRES que setColorTheme soit appelé */
    const themeTransPrimary = themeColor.primary ;
    const themeTransGradient = themeColor.primaryGradient ;

    /* stock individuellement chaque element du string "r, g, b" crée au dessus dans un array ce qui donne : ["r", "g", "b"]  */
    const rgbTransPrimary = themeTransPrimary.match(/\d+/g) ;
    const rgbTransGradient = themeTransGradient.match(/\d+/g) ;

    const ArrayTransPrimary = [] ;
    const ArrayTransGradient = [] ;

    /* converti en int et stock les valeurs "r", "g" et "b" dans un array */
    for(let i = 0; i < rgbTransPrimary.length; i++) {
        ArrayTransPrimary.push(parseInt(rgbTransPrimary[i])) ;        
    }

    for(let i = 0; i < rgbTransGradient.length; i++) {
        ArrayTransGradient.push(parseInt(rgbTransGradient[i])) ;
    }

    // stock dans deux array associative les valeurs rgb du gradient actuelle et du gradient vers lequel je veux faire la transition 
    const firstColorsGradient = [ 
    { percent: 0,  color: { r: ArrayActualGradient[0], g: ArrayActualGradient[1], b: ArrayActualGradient[2] } }, // première couleur du gradient 
    { percent: 100, color: { r: ArrayTransGradient[0], g: ArrayTransGradient[1], b: ArrayTransGradient[2] } }  // première couleur après transition du gradient 
    ]

    const secondColorsGradient = [                                                                               // (Egalement la couleur primaire de mon site)
    { percent: 0,  color: { r: ArrayActualPrimary[0], g: ArrayActualPrimary[1], b: ArrayActualPrimary[2] } }, // deuxième couleur du gradient 
    { percent: 100, color: { r: ArrayTransPrimary[0], g: ArrayTransPrimary[1], b: ArrayTransPrimary[2] }}   // deuxième couleur après transition du gradient 
    ];

    // permet de rendre la transition plus fluide 
    let c1 = firstColorsGradient[0].color ;
    let c2 = secondColorsGradient[0].color ;
    rootElement.style.setProperty("--color-primary-gradient", `rgb(${c1.r}, ${c1.g}, ${c1.b})`) ;
    rootElement.style.setProperty("--color-primary", `rgb(${c2.r}, ${c2.g}, ${c2.b})`) ;

    // la fonction fait la transition entre les valeurs rgb actuelle et après transition
    function colorTransition(percent, colorSet) {
        for (var colorsCompteur = 1; colorsCompteur < colorSet.length - 1; colorsCompteur++) {
            if (percent < colorSet[i].percent) {
                break;
            }
        }
        // This conversion figures out the transition between two rgb values
        let lower = colorSet[colorsCompteur - 1];
        let upper = colorSet[colorsCompteur];
        let range = upper.percent - lower.percent;
        let rangepercent = (percent - lower.percent) / range;
        let percentLower = 1 - rangepercent;
        let percentUpper = rangepercent;

        let color = {
            r: Math.floor(lower.color.r * percentLower + upper.color.r * percentUpper),
            g: Math.floor(lower.color.g * percentLower + upper.color.g * percentUpper),
            b: Math.floor(lower.color.b * percentLower + upper.color.b * percentUpper)
        };

        // And returns the rgb code
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    } 

    function animateGradient() {
        if(intervalFrame === undefined) {
            intervalFrame = setInterval(() => {
                let time = transitionTime / 1000; // time in seconds
                let numberOfFrames = time * 60; // 60 frames per second -> 1 second = 60 frames

                // compteur qui incrémente la vitesse de transition 
                elapsed += 3;
                // The elapsed frames out of max frames
                currentPercent = Math.min(elapsed / numberOfFrames, 1) * 100;

                // Calculate current color in this time for each gradient color
                let colorOne = colorTransition(currentPercent, firstColorsGradient);
                let colorTwo = colorTransition(currentPercent, secondColorsGradient);

                element.style.setProperty("--color-primary-gradient", `${colorOne}`);
                element.style.setProperty("--color-primary", `${colorTwo}`);

                // End the interval when we're done
                if(currentPercent === 100 || currentPercent === 0) {
                    clearInterval(intervalFrame);
                    intervalFrame = undefined;
                }
            }, 16.667); // 60 frames per second
        } 
    } 
    animateGradient() ;
    } )
);   


/* btn menu burger sur la nav */
document.getElementById("iconBurger").addEventListener("click", toggleTopnavResponsive);
document.getElementById("gearBtn").addEventListener("click", toggleGearMenu);


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



