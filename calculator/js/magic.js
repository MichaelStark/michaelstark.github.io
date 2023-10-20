// permissions
let isNotificationGranted = window.Notification && Notification.permission === "granted";
let deviceOrientationGranted = false;

// notification
if (navigator.permissions) {
    navigator.permissions.query({ name: "notifications" }).then(status => status.onchange = _ => isNotificationGranted = window.Notification && Notification.permission === "granted");
}

// requests
window.addEventListener("pointerup", getPermissions);
function getPermissions() {
    window.removeEventListener("pointerup", getPermissions);
    if (window.Notification && Notification.permission === "default") {
        Notification.requestPermission();
    }
    if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && !deviceOrientationGranted) {
        DeviceOrientationEvent.requestPermission(); // iOS 13+
    }
}

let magicHistory = "";
let magicHistoryDelay = false;
let magicToxicResult = "";
let magicDDFResult = "";
let magicDDFAuto = false;
let magicDDFManualTimeout = false;
let overlayDDFEl = document.getElementById("overlayDDF");
overlayDDFEl.onpointerdown = _ => {
    feedback();
    if (magicDDFResult) {
        if (!magicDDFAuto && !magicDDFManualTimeout) {
            magicDDFManualTimeout = true;
            setTimeout(_ => { feedback(true); overlayDDFEl.classList.add("hidden"); magicDDFAuto = true; magicDDFManualTimeout = false; }, 10000);
        }
        clearPushedOperation();
        resetEl.innerText = "C";
        isDigitsTyping = true;
        let forceValue = magicDDFResult;
        let forceValueNumber = Number(forceValue);
        if (forceValueNumber >= 0 && forceValueNumber <= 9) {
            let forceTime = new Date(((new Date()).getTime() + 60000 * (forceValueNumber === 0 ? 1 : forceValueNumber)));
            forceValue = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
            forceValueNumber = Number(forceValue);
        }
        switch (operation) {
            case "+":
                inputValue = (forceValueNumber - resultValue).toString();
                break;
            case "-":
                inputValue = (resultValue - forceValueNumber).toString();
                break;
            case "x":
                inputValue = (forceValueNumber / resultValue).toString();
                break;
            case "÷":
                inputValue = (resultValue / forceValueNumber).toString();
                break;
            default:
                if (inputValue !== forceValue) {
                    if (forceValue.startsWith(inputValue)) {
                        inputValue += forceValue[inputValue.length];
                    } else {
                        inputValue = forceValue[0];
                    }
                }
                break;
        }
        displayValue(inputValue);
    }
};
window.ondeviceorientation = (e) => {
    deviceOrientationGranted = e.alpha != null && e.beta != null && e.gamma != null;
    if (deviceOrientationGranted && magicDDFResult && magicDDFAuto) {
        if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
            overlayDDFEl.classList.remove("hidden");
        } else {
            overlayDDFEl.classList.add("hidden");
        }
    }
};

function add2MagicHistory(value, needReplaceLast = false) {
    if (!isOperationOrEmptyOrLE(value) || !isOperationOrEmptyOrLE(magicHistory.slice(magicHistory.length - 1, magicHistory.length))) {
        magicHistory += value;
    } else if (needReplaceLast) {
        magicHistory = magicHistory.replace(/.$/, value);
    }
}

function magic(target) {
    switch (target.id) {
        case "c":
            // reload
            document.location.reload();
            break;
        case "+-":
            // remote control
            break;
        case "%":
            // numerology
            let remainder = ((isDigitsTyping ? inputValue : resultValue.toString()).match(/\d/g).reduce((a, b) => a + Number(b), 0) % 9);
            target.innerHTML = "<sup>" + (remainder || 9) + "</sup>⁄<sub>" + (9 - remainder) + "</sub>";
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force manually
            if (magicDDFResult) {
                magicDDFAuto = false;
                overlayDDFEl.classList.remove("hidden");
            }
            break;
        case "-":
            // display down force
            disableMagic();
            magicDDFResult = inputValue;
            magicDDFAuto = true;
            if (!deviceOrientationGranted) {
                alert(i18next.t("orientationIsNotAvailable"));
            }
            reset();
            break;
        case "+":
            // toxic
            disableMagic();
            magicToxicResult = inputValue;
            reset();
            break;
        case "=":
            // history
            if (isNotificationGranted && swr) {
                magicHistoryDelay = true;
            } else {
                alert(magicHistory);
            }
            break;
    }
}

function applyMagic() {
    if (operation === "=") {
        if (magicToxicResult) {
            resultValue = Number(magicToxicResult);
        }
        if (magicHistoryDelay && isNotificationGranted && swr) {
            swr.showNotification(i18next.t("history"), {
                icon: "/calculator/images/icon-512.png",
                body: magicHistory,
                silent: true
            });
        }
        disableMagic();
    }
}

function disableMagic() {
    magicToxicResult = "";
    magicDDFResult = "";
    magicDDFAuto = false;
    magicHistoryDelay = false;
}