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

const themeColors = [
    // blue
    {
        name: "Blue",
        primary: "rgb(35, 148, 184)",
        primaryGradient: "rgb(139,195,245)",
        secondary: "rgb(45, 177, 218)",
        tertiary: "rgb(0, 108, 138)"
    },
    // red
    {
        name: "Red",
        primary: "rgb(184, 35, 35)",
        primaryGradient: "rgb(245, 139, 139)",
        secondary: "rgb(224, 42, 42)",
        tertiary: "rgb(129, 24, 24)"
    },
    // green
    {
        name: "Green",
        primary: "rgb(35, 184, 35)",
        primaryGradient: "rgb(181, 245, 139)",
        secondary: "rgb(44, 228, 44)",
        tertiary: "rgb(25, 124, 25)"
    },
    // purple
    {
        name: "Purple",
        primary: "rgb(142, 35, 184)",
        primaryGradient: "rgb(220, 139, 245)",
        secondary: "rgb(173, 42, 224)",
        tertiary: "rgb(84, 20, 109)"
    }
];

const rootElement = document.querySelector(":root"); 

function setColorTheme(themeColor) {
    rootElement.style.setProperty("--color-primary", `${themeColor.primary}`); // interpolation 
    rootElement.style.setProperty("--color-primary-gradient", `${themeColor.primaryGradient}`);
    rootElement.style.setProperty("--color-secondary", `${themeColor.secondary}`);
    rootElement.style.setProperty("--color-tertiary", `${themeColor.tertiary}`);
    // console.log(rootComputedStyle.getPropertyValue("--color-primary"));
}

const element = document.getElementById("home");               // <-- id of the button we're transitioning
let transitionTime = 500 ;          // <-- 100 ms - time our animation will last
let previousTime, start = 0;        // <-- stores data on animation
let animationDirection = 'forwards'; // <-- stores the animation direction
let intervalFrame;                  // <-- stores the interval frame
let currentPct = 0;                 // <-- current percentage through the animation
let elapsed = 0;                    // <-- number of frames which have ellapsed 

  


themeColors.forEach((themeColor) =>
    document.getElementById("gearTheme" + themeColor.name).addEventListener("click", function(){

    const rootComputedStyle = getComputedStyle(rootElement);

    /* me permet de créer un array avec comme valeur couleur en rgb du primary AVANT le changement */
    let themeLastPrimary= rootComputedStyle.getPropertyValue("--color-primary") ;
    let themeLastGradient = rootComputedStyle.getPropertyValue("--color-primary-gradient") ;

    let rgbLastPrimary = themeLastPrimary.match(/\d+/g) ;
    let rgbLastGradient = themeLastGradient.match(/\d+/g) ;

    const ArrayLastPrimary = [] ; 
        // if(ArrayLastPrimary != ArrayActualPrimary) {
        for(let i = 0; i < rgbLastPrimary.length; i++) {
            ArrayLastPrimary.push(parseInt(rgbLastPrimary[i])) ; 
        }
        // }

    const ArrayLastGradient = [] ;
        for(let i = 0; i < rgbLastGradient.length; i++) {
            ArrayLastGradient.push(parseInt(rgbLastGradient[i])) ;
        }

    setColorTheme(themeColor) ;

    /* me permet de créer un array avec comme valeur la couleur en rgb du primary APRES le changement */
    let themeActualPrimary = rootComputedStyle.getPropertyValue("--color-primary") ;
    let themeActualGradient = rootComputedStyle.getPropertyValue("--color-primary-gradient") ;

    let rgbActualPrimary = themeActualPrimary.match(/\d+/g) ;
    let rgbActualGradient = themeActualGradient.match(/\d+/g) ;

    const ArrayActualPrimary = [] ;
        for(let i = 0; i < rgbActualPrimary.length; i++) {
            ArrayActualPrimary.push(parseInt(rgbActualPrimary[i])) ;        
        }

    const ArrayActualGradient = [] ;
        for(let i = 0; i < rgbActualGradient.length; i++) {
            ArrayActualGradient.push(parseInt(rgbActualGradient[i])) ;
        }

    console.log("array last puis actual primary :")
    console.log(ArrayLastPrimary);
    console.log(ArrayActualPrimary);

    console.log("array last puis actual gradient :")
    console.log(ArrayLastGradient);
    console.log(ArrayActualGradient);
    // Apply our gradient programmatically so we can completely manipulate the gradient from JS rather than CSS

    const gradientStopOne = [ // { r: 35, g: 148, b: 184 } // { r: 184, g: 35, b: 35 }
    { pct: 0,  color: { r: ArrayLastGradient[0], g: ArrayLastGradient[1], b: ArrayLastGradient[2] } }, // couleur de base //  // primaryGradient 
    { pct: 100, color: { r: ArrayActualGradient[0], g: ArrayActualGradient[1], b: ArrayActualGradient[2] } }  // couleur de transition primaire // // primaryGradient
    ]
    
    const gradientStopTwo = [ // { r: 139, g: 195, b: 245 } // { r: 245, g: 139, b: 139 }
    { pct: 0,  color: { r: ArrayLastPrimary[0], g: ArrayLastPrimary[1], b: ArrayLastPrimary[2] } }, // couleur de base secondaire // ArrayLastPrimary // primary
    { pct: 100, color: { r: ArrayActualPrimary[0], g: ArrayActualPrimary[1], b: ArrayActualPrimary[2] }}   // couleur de transition secondaire // ArrayActualPrimary // primary
    ];
    
    let c1 = gradientStopOne[0].color ;
    let c2 = gradientStopTwo[0].color ;

    // document.getElementById('home').style.background = `radial-gradient(rgb(${c1.r}, ${c1.g}, ${c1.b}), rgb(${c2.r}, ${c2.g}, ${c2.b}))`;

    // This function transitions between two rgb colors
    const getColor = function(pct, colorSet) {
        for (var i = 1; i < colorSet.length - 1; i++) {
            if (pct < colorSet[i].pct) {
                break;
            }
        }
        // This conversion figures out the transition between two rgb values
        var lower = colorSet[i - 1];
        var upper = colorSet[i];
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

    // This is our animation which we run on hover
    const animateGradient = function() {
        if(intervalFrame === undefined) {
            intervalFrame = setInterval(() => {
                let time = transitionTime / 1000; // time in seconds
                let numberOfFrames = time * 60; // 60 frames per second -> 1 second = 60 frames

                // If the animation is going forward
                if(animationDirection === 'forwards') {
                    // Add 1 to elapsed
                    elapsed += 1;
                    // The elapsed frames out of max frames
                    currentPct = Math.min(elapsed / numberOfFrames, 1) * 100;
                } else {
                    // Otherwise we're going back - subtract 1 from ellapsed
                    elapsed -= 1;
                    // The elapsed frames out of max frames
                    currentPct = Math.max(elapsed / numberOfFrames, 0) * 100;
                }

                // Calculate current color in this time for each gradient color
                let colorOne = getColor(currentPct, gradientStopOne);
                let colorTwo = getColor(currentPct, gradientStopTwo);

                // Generate CSS string
                let generateGradient = `radial-gradient(${colorOne}, ${colorTwo})`;

                // Add it to our background.
                document.getElementById(element).style.backgroundImage = generateGradient;

                // End the interval when we're done
                if(currentPct === 100 || currentPct === 0) {
                    clearInterval(intervalFrame);
                    intervalFrame = undefined;
                }
            }, 16.667); // 60 frames per second
        }
    };

    // On hover, run our animation
    document.getElementById("gearTheme" + themeColor.name).addEventListener('click', function() {
        if(animationDirection == 'backwards' ) {
            animationDirection = 'forwards'
            animateGradient();
        } else {
        animationDirection = 'backwards'
        animateGradient();
        }

    });

    // document.getElementById('gearThemeBlue').addEventListener('click', function() {
    //     animationDirection = 'backwards'
    //     animateGradient();
    // });
    } )
);   

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// On hover out, run our animation again, but backwards
// document.getElementById('featuresDesignIdTrans').addEventListener('mouseleave', function() {
//     animationDirection = 'backwards';
//     animateGradient();
// });


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



