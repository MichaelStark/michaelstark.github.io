if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js"); // enable PWA
}
window.ontouchend = _ => false; // disable long press vibration ! do not disable context menu
document.getElementById(".").innerText = .1.toLocaleString().slice(1, 2); // set dot depend on locale

// i18n
i18next.use(i18nextBrowserLanguageDetector).init(i18n);

// version
let currentVersion = localStorage.getItem("currentVersion");
if (!currentVersion || currentVersion !== version) {
    alert(i18next.t("newVersionAvailable"));
    localStorage.setItem("currentVersion", version);
}

let formatter = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 20 });
let calcEl = document.getElementById("calc");
let displayEl = document.getElementById("display");
let resetEl = document.getElementById("c");
let buttonElList = document.getElementsByClassName("button");
let digitElList = document.getElementsByClassName("digit");
let operationElList = document.getElementsByClassName("operation");
let pushedBtnsCount = 0;
let longPressTarget;
let longPressTimer;
let resultValue = 0;
let inputValue = "0";
let operation = "";
let isDigitsTyping = false;

displayEl.addEventListener("pointerdown", startBtnHandler);
displayEl.addEventListener("pointerup", endBtnHandler);
displayEl.addEventListener("pointercancel", cancelBtnHandler);
for (el of buttonElList) {
    el.addEventListener("pointerdown", startBtnHandler);
    el.addEventListener("pointerup", endBtnHandler);
    el.addEventListener("pointercancel", cancelBtnHandler);
}

function feedback(isMagic) {
    if (isMagic) {
        document.body.classList.add("magicAlarm");
        setTimeout(_ => document.body.classList.remove("magicAlarm"), 200);
    }
    if (navigator.vibrate) {
        if (isMagic) {
            navigator.vibrate(200);
        } else {
            navigator.vibrate(1);
        }
    }
}

function getPushClass(classList) {
    if (classList.contains("digit")) {
        return "pushDigit";
    } else if (classList.contains("operation")) {
        return "pushOperation";
    } else {
        return "pushUtil";
    }
}

function clearPushedOperation() {
    for (el of operationElList) {
        el.classList.remove("pushedOperation");
    }
}

function startBtnHandler(e) {
    pushedBtnsCount++;
    let target = e.target.closest("div");
    if (target !== displayEl) {
        target.classList.remove("pushOff");
        clearPushedOperation();
        target.classList.add(getPushClass(target.classList));
    }
    target.setPointerCapture(e.pointerId); // fix for mouse leave
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        longPressTarget = null;
    }
    if (pushedBtnsCount === 1) {
        longPressTimer = setTimeout(_ => {
            feedback(true);
            longPressTarget = target;
        }, 2000);
    }
}

function endBtnHandler(e) {
    cancelBtnHandler(e);
    let target = e.target.closest("div");
    if (longPressTarget === target) {
        longPressTarget = null;
        target.classList.remove("pushedOperation");
        if (target === displayEl) {
            document.location.assign("./readme.html");
        } else {
            magic(target);
        }
    } else {
        feedback();
        btnHandler(target);
    }
}

function cancelBtnHandler(e) {
    pushedBtnsCount--;
    let target = e.target.closest("div");
    if (target !== displayEl) {
        target.classList.remove(getPushClass(target.classList));
        clearPushedOperation();
        target.classList.add("pushOff");
        if (target.classList.contains("operation") && target.id !== "=") {
            target.classList.add("pushedOperation");
        }
    }
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
}

function btnHandler(target) {
    if (target === displayEl) {
        // do not remove last zero or if exponential notation
        if (inputValue.length && inputValue !== "0" && !inputValue.includes("e")) {
            inputValue = inputValue.slice(0, -1);
            // remove negative sign if value is 0
            if (inputValue.startsWith("-") && Number(inputValue) === 0) {
                inputValue = inputValue.slice(1);
            }
            // set value to 0 if removed last digit
            if (!inputValue.length || inputValue === "-") {
                inputValue = "0";
            }
            displayValue(inputValue);
        }
    } else if (digitElList.namedItem(target.id)) {
        // max 13 digits and only one decimal dot and do not edit exponential notation
        if (inputValue.replace(/\D/g, "").length < 13 && !inputValue.includes("e") && (target.id !== "." || !inputValue.includes("."))) {
            // prevent containing just zeros or starts with zero
            if (inputValue === "0" && target.id !== ".") {
                inputValue = "";
            }
            resetEl.innerText = "C";
            isDigitsTyping = true;
            inputValue += target.id;
            displayValue(inputValue);
        }
    } else {
        switch (target.id) {
            case "c":
                if (target.innerText === "AC") {
                    reset();
                } else {
                    resetEl.innerText = "AC";
                    inputValue = "0";
                    displayValue(inputValue);
                }
                break;
            case "%":
                if (inputValue.length && inputValue !== "0" && !inputValue.includes("e")) {
                    let percent = Number(inputValue) / 100;
                    if (operation === "+" || operation === "-") {
                        percent = resultValue * percent;
                    }
                    inputValue = Number(percent.toFixed(12)).toString();
                    displayValue(inputValue);
                }
                break;
            case "+-":
                if (Number(inputValue) !== 0) {
                    if (Number(inputValue) > 0) {
                        inputValue = "-" + inputValue;
                    } else {
                        inputValue = inputValue.slice(1);
                    }
                    displayValue(inputValue);
                }
                break;
            default:
                magicHistory += inputValue + target.id;
                if (operation === "") {
                    resultValue = Number(inputValue);
                } else if (isDigitsTyping) {
                    switch (operation) {
                        case "+":
                            resultValue = resultValue + Number(inputValue);
                            break;
                        case "-":
                            resultValue = resultValue - Number(inputValue);
                            break;
                        case "x":
                            resultValue = resultValue * Number(inputValue);
                            break;
                        case "÷":
                            resultValue = resultValue / Number(inputValue);
                            break;
                        case "=":
                            resultValue = Number(inputValue);
                            break;
                    }
                    resultValue = Number(resultValue.toFixed(12));
                    if (Math.abs(resultValue) > Number.MAX_SAFE_INTEGER) {
                        resultValue = Number.NaN;
                    }
                }
                if (target.id === "=") {
                    applyMagic();
                    disableMagic();
                }
                resetEl.innerText = "C";
                isDigitsTyping = false;
                inputValue = "0";
                operation = target.id;
                displayValue(resultValue.toString());
                break;
        }
    }
}

function displayValue(value, showAsIs = false) {
    // fix formatter if last symbol is 0 or .
    let isNeedZeroFormatFix = value.includes(".") && (value[value.length - 1] === "0" || value[value.length - 1] === ".");
    if (isNeedZeroFormatFix) {
        value += "1";
    }
    if (showAsIs || value.includes("e")) {
        displayEl.innerText = value;
    } else {
        displayEl.innerText = formatter.format(value);
    }
    if (isNeedZeroFormatFix) {
        displayEl.innerText = displayEl.innerText.slice(0, -1);
    }
    // calculate font
    let sizeIndex = 1;
    do {
        displayEl.className = "displayS" + sizeIndex;
    } while (sizeIndex++ < 12 && displayEl.scrollWidth > displayEl.clientWidth);
}

function reset() {
    resetEl.innerText = "AC";
    resultValue = 0;
    inputValue = "0";
    operation = "";
    isDigitsTyping = false;
    displayValue(inputValue);
}