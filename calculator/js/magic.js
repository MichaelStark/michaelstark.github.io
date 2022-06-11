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
        if (forceValue === "0") {
            let forceTime = new Date(((new Date()).getTime() + 60000));
            forceValue = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
        }
        switch (operation) {
            case "+":
                inputValue = (Number(forceValue) - resultValue).toString();
                break;
            case "-":
                inputValue = (resultValue - Number(forceValue)).toString();
                break;
            case "x":
                inputValue = (Number(forceValue) / resultValue).toString();
                break;
            case "÷":
                inputValue = (resultValue / Number(forceValue)).toString();
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
            if (isNotificationGranted) {
                navigator.serviceWorker.ready.then(registration => registration.showNotification(i18next.t("history"), { body: magicHistory, silent: true }));
            } else {
                alert(magicHistory);
            }
            break;
    }
}

function applyMagic() {
    if (magicToxicResult) {
        resultValue = Number(magicToxicResult);
    }
}

function disableMagic() {
    magicToxicResult = "";
    magicDDFResult = "";
    magicDDFAuto = false;
}