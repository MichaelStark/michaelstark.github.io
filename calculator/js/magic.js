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
let magicHistoryBuffer = "";
let isMagicHistoryEnabled = localStorage.getItem("isMagicHistoryEnabled") || false;
let magicToxicResult = "";
let magicDDFResult = "";
let isMagicDDFAuto = false;
let isMagicDDFManualTimeout = false;
let overlayDDFEl = document.getElementById("overlayDDF");
overlayDDFEl.onpointerdown = _ => {
    feedback();
    if (magicDDFResult) {
        if (!isMagicDDFAuto && !isMagicDDFManualTimeout) {
            isMagicDDFManualTimeout = true;
            setTimeout(_ => {
                feedback(true);
                overlayDDFEl.classList.add("hidden");
                isMagicDDFAuto = true;
                isMagicDDFManualTimeout = false;
            }, 10000);
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
    if (deviceOrientationGranted && magicDDFResult && isMagicDDFAuto) {
        if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
            overlayDDFEl.classList.remove("hidden");
        } else {
            overlayDDFEl.classList.add("hidden");
        }
    }
};

function add2MagicHistory(value, needReplaceLast = false) {
    if (isLE(value) && magicHistoryBuffer.length > 0) {
        magicHistory = magicHistoryBuffer + value + magicHistory;
        magicHistoryBuffer = "";
    } else if (!isOperationOrEmptyOrLE(value) || !isOperationOrEmptyOrLE(magicHistoryBuffer.slice(magicHistoryBuffer.length - 1, magicHistoryBuffer.length))) {
        magicHistoryBuffer += value;
    } else if (needReplaceLast) {
        magicHistoryBuffer = magicHistoryBuffer.replace(/.$/, value);
    }
}

function getMagicHistory() {
    return magicHistoryBuffer + "\n" + magicHistory;
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
                isMagicDDFAuto = false;
                overlayDDFEl.classList.remove("hidden");
            }
            break;
        case "-":
            // display down force
            disableMagic();
            magicDDFResult = inputValue;
            isMagicDDFAuto = true;
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
                isMagicHistoryEnabled = !isMagicHistoryEnabled;
                localStorage.setItem("isMagicHistoryEnabled", isMagicHistoryEnabled);
                alert(i18next.t(isMagicHistoryEnabled ? "magicHistoryIsEnabled" : "magicHistoryIsDisabled"));
            } else {
                alert(getMagicHistory());
            }
            break;
    }
}

function applyMagic() {
    if (operation === "=") {
        if (magicToxicResult) {
            resultValue = Number(magicToxicResult);
        }
        disableMagic();
    }
    if (isMagicHistoryEnabled && isNotificationGranted && swr) {
        swr.getNotifications().then((notifications) => {
            notifications.forEach(notification => notification.close());
            swr.showNotification(i18next.t("history"), {
                //tag: "history", //not working on iOS
                icon: "./images/icon-512.png",
                body: getMagicHistory(),
                silent: true
            });
        });
    }
}

function disableMagic() {
    magicToxicResult = "";
    magicDDFResult = "";
    isMagicDDFAuto = false;
}