/*
    Calculates limiting factor based on current window size and constant reference values
    Resizes HTML-elements based on the limiting factor
 */
function resizeElements() {
    const referenceWidth = 1920;
    const referenceHeight = 969;

    let factor;
    if(window.innerWidth / window.innerHeight > referenceWidth / referenceHeight){
        // height is limiting factor
        factor = window.innerHeight / referenceHeight;
    }else{
        // width is limiting factor
        factor = window.innerWidth / referenceWidth;
    }

    /*
        Parameters:
            selector: CSS selector of HTML-element(s)
            property: The CSS property to change
            referenceValue: Value when referenceWidth equals window.innerWidth and referenceHeight equals window.innerWidth

        Resizes HTML-element(s)
     */
    function resizeElement(selector, property, referenceValue){
        const elements = document.querySelectorAll(selector);
        for(let el of elements){
            const value = referenceValue * factor;
            el.style[property] = value + "px";
        }
    }

    resizeElement("#audioButton",                  "width",                65)
    resizeElement("#audioButton",                  "height",               65)
    resizeElement("#audioButton",                  "borderWidth",          2)
    resizeElement("#audioButton",                  "borderRadius",         10)
    resizeElement("#gameCredit",                   "fontSize",             15)

    resizeElement("#title",                        "fontSize",             150)
    resizeElement("#title",                        "webkitTextStrokeWidth",2)
    resizeElement(".settingsWrapper",              "borderRadius",         20)
    resizeElement(".settingsWrapper",              "borderWidth",          2)
    resizeElement(".numOfPlayersLabel",            "fontSize",             35)
    resizeElement(".numOfPlayersRadio",            "borderWidth",          2)
    resizeElement(".numOfPlayersRadio",            "borderRadius",         5)
    resizeElement(".playerColourSettingsWrapper p","fontSize",             50)
    resizeElement(".colourBox",                    "width",                70)
    resizeElement(".colourBox",                    "height",               70)
    resizeElement(".colourBox",                    "borderWidth",          2)
    resizeElement(".colourBox",                    "borderRadius",         5)
    resizeElement(".sliderTitle",                  "fontSize",             50)
    resizeElement(".slider",                       "borderRadius",         5)
    resizeElement(".sliderValue",                  "fontSize",             30)
    resizeElement("#playButton",                   "fontSize",             40)
    resizeElement("#playButton",                   "borderRadius",         15)
    resizeElement("#playButton",                   "borderWidth",          2)

    resizeElement("#menuButton",                   "borderWidth",          2)
    resizeElement("#menuButton",                   "borderRadius",         10)
    resizeElement("#menuButton",                   "fontSize",             40)
    resizeElement("#menuButton",                   "height",               65)
    resizeElement("#gameAreaWrapper",              "width",                1200)
    resizeElement("#gameAreaWrapper",              "height",               900)
    resizeElement("#gameArea",                     "borderRadius",         10)
    resizeElement("#gameAreaText",                 "fontSize",             100)
    resizeElement("#gameAreaText",                 "webkitTextStrokeWidth",3)
    resizeElement(".sideInfo",                     "width",                360)
    resizeElement("#pointsToWin",                  "marginLeft",           10)
    resizeElement("#pointsToWin",                  "fontSize",             30)
    resizeElement("#pointsToWinStaticText",        "fontSize",             30)
    resizeElement(".statsTitle",                   "fontSize",             65)
    resizeElement(".statsTitle",                   "webkitTextStrokeWidth",2)
    resizeElement(".points",                       "fontSize",             200)
    resizeElement(".points",                       "webkitTextStrokeWidth",2)
    resizeElement(".pt",                           "fontSize",             40)
    resizeElement(".pt",                           "webkitTextStrokeWidth",1)
    resizeElement(".key",                          "borderWidth",          1)
    resizeElement(".key",                          "borderRadius",         10)
    resizeElement(".key",                          "margin",               3)
    resizeElement(".key",                          "width",                60)
    resizeElement(".key",                          "height",               60)
    resizeElement(".key",                          "fontSize",             40)
}

window.addEventListener("resize", resizeElements); // Calls the resizeElements function when the window size changes
resizeElements(); // Resize elements once at start