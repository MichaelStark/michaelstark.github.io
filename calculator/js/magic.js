var magicHistory = "";
var magicToxicResult = "";
var magicDDFResult = "";
var magicDDFAuto = false;
var overlayDDFEl = document.getElementById("overlayDDF");
overlayDDFEl.onpointerdown = _ => {
    clearPushedOperation();
    feedback();
    if (magicDDFResult) {
        isDigitsTyping = true;
        if (Number(magicDDFResult) === 0) {
            var forceTime = new Date(((new Date()).getTime() + 60000));
            magicDDFResult = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
        }
        switch (operation) {
            case "+":
                inputValue = (Number(magicDDFResult) - resultValue).toString();
                break;
            case "-":
                inputValue = (resultValue - Number(magicDDFResult)).toString();
                break;
            case "x":
                inputValue = (Number(magicDDFResult) / resultValue).toString();
                break;
            case "÷":
                inputValue = (resultValue / Number(magicDDFResult)).toString();
                break;
            default:
                inputValue = magicDDFResult;
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
            var remainder = ((isDigitsTyping ? inputValue : resultValue.toString()).match(/\d/g).reduce((a, b) => a + Number(b), 0) % 9);
            target.innerHTML = "<sup>" + remainder + "</sup>⁄<sub>" + (9 - remainder) + "</sub>";
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force manually
            if (magicDDFResult) {
                magicDDFAuto = false;
                overlayDDFEl.classList.remove("hidden");
                setTimeout(_ => { feedback(true); overlayDDFEl.classList.add("hidden"); magicDDFAuto = true; }, 10000);
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