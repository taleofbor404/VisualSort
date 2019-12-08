var CONTAINER_WIDTH = 580;
var container = document.getElementById("bars");
function clearContainer() {
    container.innerHTML = "";
}

var TOTAL_ELEMENTS = 10;
function insertBars() {
    var width = CONTAINER_WIDTH / TOTAL_ELEMENTS;

    for (i = 0; i < TOTAL_ELEMENTS; ++i) {
        var height = Math.round(Math.random() * 89) + 10;
        var bar = document.createElement("div");
        bar.setAttribute("class", "bar");
        bar.setAttribute("style", "width: " + width + "px; height: " + height + "%;");
        bar.innerHTML = height;
        container.appendChild(bar);
    }
}

function newArray() {
    window.location.reload();
}
clearContainer();
insertBars();

// from https://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them?lq=1
function swapElements(obj1, obj2) {
    try {
        // save the location of obj2
        var parent2 = obj2.parentNode;
        var next2 = obj2.nextSibling;
        // special case for obj1 is the next sibling of obj2
        if (next2 === obj1) {
            // just put obj1 before obj2
            parent2.insertBefore(obj1, obj2);
        } else {
            // insert obj2 right before obj1
            obj1.parentNode.insertBefore(obj2, obj1);

            // now insert obj1 where obj2 was
            if (next2) {
                // if there was an element after obj2, then insert obj1 right before that
                parent2.insertBefore(obj1, next2);
            } else {
                // otherwise, just append as last child
                parent2.appendChild(obj1);
            }
        }
    } catch (e) {}
}

function getHeight(elem) {
    try {
        return elem.style.height.replace("%", "");
    } catch (e) {
        return 0;
    }
}

function redBg(elem1, elem2) {
    elem1.style.backgroundColor = "red";
    elem2.style.backgroundColor = "red";
}

function blueBg(elem1, elem2) {
    elem1.style.backgroundColor = "lightblue";
    elem2.style.backgroundColor = "lightblue";
}

var bars = document.getElementsByClassName("bar");
function bubbleSort() {
    var delay = 300;
    var compareDelay = delay / 2;
    var outerDelay = delay * TOTAL_ELEMENTS;

    for (i = 0; i < TOTAL_ELEMENTS; ++i) {
        (function(i) {
            setTimeout(function() {
                for (j = 0; j < TOTAL_ELEMENTS - i - 1; ++j) {
                    (function(j) {
                        setTimeout(function() {
                            var leftElement = bars[j];
                            var rightElement = bars[j + 1];

                            $(leftElement).addClass("compared");
                            $(rightElement).addClass("compared");

                            if (getHeight(rightElement) > getHeight(leftElement)) {
                                swapElements(rightElement, leftElement);
                            }
                            $(leftElement)
                                .wait(compareDelay)
                                .removeClass("compared");
                            $(rightElement)
                                .wait(compareDelay)
                                .removeClass("compared");
                        }, delay * j);
                    })(j);
                }
            }, outerDelay * i);
        })(i);
    }
}

// function selectio2nSort() {
//     for (i = 0; i < TOTAL_ELEMENTS - 1; ++i) {
//         var max = i;
//         for (j = i + 1; j < TOTAL_ELEMENTS; ++j) {
//             if (getHeight(bars[j]) > getHeight(bars[max])) {
//                 max = j;
//             }
//         }
//         swapElements(bars[i], bars[max]);
//     }
// }

function selectionSort() {
    var delay = 300;
    var outerDelay = delay * TOTAL_ELEMENTS;
    for (i = 0; i < TOTAL_ELEMENTS; i++) {
        var currentMaxIndex = i;
        (function(i) {
            setTimeout(function() {
                $(bars[i]).addClass("compared");
                console.log(i + " " + outerDelay);

                for (j = i + 1; j < TOTAL_ELEMENTS; j++) {
                    $(bars[i])
                        .wait(outerDelay)
                        .removeClass("compared");
                    outerDelay = delay * (TOTAL_ELEMENTS - j);

                    (function(j) {
                        setTimeout(function() {
                            console.log(" - " + j + " " + delay);
                            $(bars[j]).addClass("compared");

                            if (getHeight(bars[j]) > getHeight(bars[currentMaxIndex])) {
                                currentMaxIndex = j;
                            }

                            $(bars[j])
                                .wait(outerDelay / TOTAL_ELEMENTS)
                                .removeClass("compared");
                        }, outerDelay / TOTAL_ELEMENTS - j);
                    })(j);
                }
                if (getHeight(bars[i - 1]) < getHeight(bars[currentMaxIndex])) {
                    console.log("swapping : " + getHeight(bars[i - 1]) + " < " + getHeight(bars[currentMaxIndex]));
                    swapElements(bars[i - 1], bars[currentMaxIndex]);
                }
            }, outerDelay * i);
        })(i);
    }
}
