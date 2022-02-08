window.onerror = (message, url, lineNumber) => notify("Error", message + "\n(" + url + ":" + lineNumber + ")"); // debug
window.ontouchend = _ => false; // disable long press vibration ! do not disable context menu
window.addEventListener("load", _ => navigator.serviceWorker.register("./sw.js")); // enable PWA
window.setTimeout(_ => document.getElementById("version").remove(), 1000); // hide version
document.getElementById(".").innerText = .1.toLocaleString().slice(1, 2); // set dot depend on locale

// notification
var isNotificationGranted = window.Notification && Notification.permission === "granted";
if (navigator.permissions) {
    navigator.permissions.query({ name: "notifications" }).then(status => status.onchange = _ => isNotificationGranted = window.Notification && Notification.permission === "granted");
}

// permissions
window.addEventListener("pointerup", getPermissions);
function getPermissions() {
    window.removeEventListener("pointerup", getPermissions);
    if (window.Notification && Notification.permission === "default") {
        Notification.requestPermission();
    }
    if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission(); // iOS 13+
    }
}

var formatter = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 20 });
var overlayEl = document.getElementById("overlay");
var calcEl = document.getElementById("calc");
var displayEl = document.getElementById("display");
var resetEl = document.getElementById("c");
var buttonElList = document.getElementsByClassName("button");
var digitElList = document.getElementsByClassName("digit");
var operationElList = document.getElementsByClassName("operation");
var pushedBtnsCount = 0;
var longPressTarget;
var longPressTimer;

displayEl.addEventListener("pointerdown", removeLastSymbolHandler);
for (el of buttonElList) {
    el.addEventListener("pointerdown", startBtnHandler);
    el.addEventListener("pointerup", endBtnHandler);
    el.addEventListener("pointercancel", cancelBtnHandler);
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

function startBtnHandler(e) {
    pushedBtnsCount++;
    var target = e.target.closest("div");
    target.classList.remove("pushOff");
    for (el of operationElList) {
        el.classList.remove("pushedOperation");
    }
    target.classList.add(getPushClass(target.classList));
    target.setPointerCapture(e.pointerId); // fix for mouse leave
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        longPressTarget = null;
    }
    if (pushedBtnsCount === 1) {
        longPressTimer = setTimeout(_ => {
            vibrate(true);
            longPressTarget = target;
        }, 3000);
    }
}

function endBtnHandler(e) {
    cancelBtnHandler(e);
    var target = e.target.closest("div");
    if (longPressTarget === target) {
        longPressTarget = null;
        target.classList.remove("pushedOperation");
        magic(e);
    } else {
        vibrate();
        btnHandler(e);
    }
}

function cancelBtnHandler(e) {
    pushedBtnsCount--;
    var target = e.target.closest("div");
    target.classList.remove(getPushClass(target.classList));
    for (el of operationElList) {
        el.classList.remove("pushedOperation");
    }
    target.classList.add("pushOff");
    if (target.classList.contains("operation") && target.id !== "=") {
        target.classList.add("pushedOperation");
    }
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
}

function vibrate(isMagic) {
    if (navigator.vibrate) {
        if (isMagic) {
            navigator.vibrate(200);
        } else {
            navigator.vibrate(1);
        }
    } else if (isMagic) {
        document.body.classList.add("magicAlarm");
        setTimeout(_ => document.body.classList.remove("magicAlarm"), 200);
    }
}

function notify(title, msg) {
    if (isNotificationGranted) {
        navigator.serviceWorker.ready.then(registration => registration.showNotification(title, { body: msg, silent: true }));
    } else {
        alert(msg);
    }
}

var resultValue = 0;
var inputValue = "0";
var operation = "";
var isDigitsTyping = false;

var magicHistory = "";
var magicToxicResult = "";
var magicDDFResult = "";

function magic(e) {
    var target = e.target.closest("div");
    switch (target.id) {
        case "c":
            // reload
            document.location.reload();
            break;
        case "+-":
            // info
            notify("Information", "AC  reload app\n⁺/₋  magic info\n%    wunderkind\n-     display down force (0 without gyroscope)\n+    toxic force\n=    history peek");
            break;
        case "%":
            // wunderkind
            target.innerText = 9 - ((isDigitsTyping ? Number(inputValue) : resultValue) % 9);
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force without gyroscope
            overlayEl.classList.remove("hidden");
            overlayEl.onpointerdown = magicDDF;
            setTimeout(_ => { vibrate(true); overlayEl.classList.add("hidden"); overlayEl.onpointerdown = null; }, 15000);
            break;
        case "-":
            // display down force
            if (!window.DeviceOrientationEvent) {
                notify("Error", "Device orientation is not supported by your browser");
                break;
            }
            magicDDFResult = inputValue;
            overlayEl.onpointerdown = magicDDF;
            window.ondeviceorientation = (e) => {
                if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
                    overlayEl.classList.remove("hidden");
                } else {
                    overlayEl.classList.add("hidden");
                }
            };
            reset();
            break;
        case "+":
            // toxic
            magicToxicResult = inputValue;
            reset();
            break;
        case "=":
            // history
            notify("History", magicHistory);
            break;
    }
}

function magicDDF() {
    vibrate();
    isDigitsTyping = true;
    if (Number(magicDDFResult) === 0) {
        var forceTime = new Date(((new Date()).getTime() + 60000));
        magicDDFResult = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
            + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
            + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
            + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
    }
    inputValue = (Number(magicDDFResult) - resultValue).toString();
    displayValue(inputValue);
}

function reset() {
    resetEl.innerText = "AC";
    resultValue = 0;
    inputValue = "0";
    operation = "";
    isDigitsTyping = false;
    displayValue(inputValue);
}

function removeLastSymbolHandler(e) {
    // do not remove last zero or if exponential notation
    if (inputValue.length && inputValue !== "0" && !inputValue.includes("e")) {
        vibrate();
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
}

function btnHandler(e) {
    var target = e.target.closest("div");
    if (digitElList.namedItem(target.id)) {
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
                    inputValue = Number(inputValue) / 100;
                    if (operation === "+" || operation === "-") {
                        inputValue = resultValue * inputValue;
                    }
                    inputValue = inputValue.toString();
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
                }
                if (target.id === "=") {
                    // disable magic functions
                    if (magicToxicResult) {
                        resultValue = Number(magicToxicResult);
                        magicToxicResult = "";
                    } else if (magicDDFResult) {
                        magicDDFResult = "";
                        overlayEl.onpointerdown = null;
                        window.ondeviceorientation = null;
                    }
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
    var isNeedZeroFormatFix = value.includes(".") && (value[value.length - 1] === "0" || value[value.length - 1] === ".");
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
    var sizeIndex = 1;
    do {
        displayEl.className = "displayS" + sizeIndex;
    } while (sizeIndex++ < 12 && displayEl.scrollWidth > displayEl.clientWidth);
}