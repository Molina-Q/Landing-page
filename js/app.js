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

function setColorTheme(themeColor) {
    rootElement.style.setProperty("--color-primary", `rgb(${themeColor.primary})`); // interpolation 
    rootElement.style.setProperty("--color-primary-gradient", `rgb(${themeColor.primaryGradient})`);
    rootElement.style.setProperty("--color-secondary", `rgb(${themeColor.secondary})`);
    rootElement.style.setProperty("--color-tertiary", `rgb(${themeColor.tertiary})`);
    // console.log(rootComputedStyle.getPropertyValue("--color-primary"));
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
    const transitionTime = 500 ;          // <-- 1000 = 100 ms temps de l'animation
    let intervalFrame;                  // <-- stores the interval frame
    let currentPct = 0;                 // <-- current percentage through the animation
    let elapsed = 0;                    // <-- number of frames which have ellapsed 

    const rootComputedStyle = getComputedStyle(rootElement);

    /* array qui stock les valeurs RGB du gradient en string AVANT que setColorTheme soit appelé */
    const themeLastPrimary= rootComputedStyle.getPropertyValue("--color-primary") ;
    const themeLastGradient= rootComputedStyle.getPropertyValue("--color-primary-gradient") ;

    /* stock individuellement chaque element du string "r, g, b" crée au dessus dans un array ce qui donne : ["r", "g", "b"] */
    const rgbLastPrimary = themeLastPrimary.match(/\d+/g) ;
    const rgbLastGradient = themeLastGradient.match(/\d+/g) ;

    const ArrayLastPrimary = [] ; 
    const ArrayLastGradient = [] ;
    
    /* converti en int et stock les valeurs "r", "g" et "b" dans un array */
    for(let i = 0; i < rgbLastPrimary.length; i++) {
        ArrayLastPrimary.push(parseInt(rgbLastPrimary[i])) ; 
    }
    
    for(let i = 0; i < rgbLastGradient.length; i++) {
        ArrayLastGradient.push(parseInt(rgbLastGradient[i])) ;
    }

    setColorTheme(themeColor) ;

    /* array qui stock les valeurs RGB du gradient en string APRES que setColorTheme soit appelé */
    const themeActualPrimary = themeColor.primary ;
    const themeActualGradient = themeColor.primaryGradient ;

    /* stock individuellement chaque element du string "r, g, b" crée au dessus dans un array ce qui donne : ["r", "g", "b"]  */
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

    const gradientStopOne = [ 
    { pct: 0,  color: { r: ArrayLastGradient[0], g: ArrayLastGradient[1], b: ArrayLastGradient[2] } }, // couleur de base //  // primaryGradient 
    { pct: 100, color: { r: ArrayActualGradient[0], g: ArrayActualGradient[1], b: ArrayActualGradient[2] } }  // couleur de transition primaire // // primaryGradient
    ]

    const gradientStopTwo = [ 
    { pct: 0,  color: { r: ArrayLastPrimary[0], g: ArrayLastPrimary[1], b: ArrayLastPrimary[2] } }, // couleur de base secondaire // ArrayLastPrimary // primary
    { pct: 100, color: { r: ArrayActualPrimary[0], g: ArrayActualPrimary[1], b: ArrayActualPrimary[2] }}   // couleur de transition secondaire // ArrayActualPrimary // primary
    ];

    let c1 = gradientStopOne[0].color ;
    let c2 = gradientStopTwo[0].color ;

    rootElement.style.setProperty("--color-primary", `rgb(${c1.r}, ${c1.g}, ${c1.b})`) ;
    rootElement.style.setProperty("--color-primary-gradient", `rgb(${c2.r}, ${c2.g}, ${c2.b})`) ;

    // This function transitions between two rgb colorsconst getColor = function
    
    function colorTransition(pct, colorSet) {

        for (var colorCompteur = 1; colorCompteur < colorSet.length - 1; colorCompteur++) {
            if (pct < colorSet[i].pct) {
                break;
            }
        }
        // This conversion figures out the transition between two rgb values
        var lower = colorSet[colorCompteur - 1];
        var upper = colorSet[colorCompteur];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;

        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };

        // And returns the rgb code
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    } 

    function animateGradient() {
        if(intervalFrame === undefined) {
            intervalFrame = setInterval(() => {
                let time = transitionTime / 1000; // time in seconds
                let numberOfFrames = time * 60; // 60 frames per second -> 1 second = 60 frames

                // Add 1 to elapsed
                elapsed += 1;
                // The elapsed frames out of max frames
                currentPct = Math.min(elapsed / numberOfFrames, 1) * 100;

                // Calculate current color in this time for each gradient color
                let colorOne = colorTransition(currentPct, gradientStopOne);
                let colorTwo = colorTransition(currentPct, gradientStopTwo);

                element.style.setProperty("--color-primary", `${colorTwo}`);
                element.style.setProperty("--color-primary-gradient", `${colorOne}`);

                // End the interval when we're done
                if(currentPct === 100 || currentPct === 0) {
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



